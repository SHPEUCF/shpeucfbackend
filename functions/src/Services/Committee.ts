import { getCommitteeCollection } from '../Controller/Committee';
import { Committee } from '../Models/Committee';
import { firestore } from 'firebase-admin';

export const addCommittee = async (committee: Committee) => {
	const committeeCollection = getCommitteeCollection();

	const size = (await getCommittees()).length;

	committeeCollection.add(committee)
		.then(async (documentSnapshot) => {
			committeeCollection.doc(documentSnapshot.id)
				.update({
					id: documentSnapshot.id,
					displayOrder: size
				})
				.then(() => Promise.resolve())
				.catch(error => Promise.reject(error));
		})
		.catch(error => Promise.reject(error));
};

export const editCommittee = (committee:Committee) => {
	const committeeCollection = getCommitteeCollection();

	committeeCollection.doc(committee.id).update({ id: committee.id,
		title: committee.title,
		events: committee.events,
		chair: committee.chair,
		description: committee.description
	})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

/**
 * Returns all existing committees in the committee collection, this function returns a list of committees,
 * since firestore doesn't allow for an entire collection to be returned as a JSON object.
 */
export const getCommittees = async () => {
	const committeeCollection = getCommitteeCollection();
	let committees: Committee[] = [];

	await committeeCollection.get()
		.then(querySnapshot => {
			committees = querySnapshot.docs.map((documentSnapshot) => {
				return documentSnapshot.data();
			});
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));

	return committees;
};

export const deleteCommittee = async (committee: Committee) => {
	const committeeRef = getCommitteeCollection();
	const docSnap = await committeeRef.where('id', '==', committee.id).get();
	let docOrder: number = -1;

	// Store this committee's displayOrder before deleting the committee.
	docSnap.forEach((doc: { id: any; data: () => any; }) => {
		docOrder = doc.data().displayOrder;
	}
	);

	committeeRef.doc(committee.id).delete()
		.then(async () => {
			const snapshot = await committeeRef.orderBy('displayOrder', 'asc').get();

			// Decrement all displayOrders by 1 for committees that came after the committee that previously existed.
			snapshot.forEach((doc: { id: any; data: () => any; }) => {
				if (doc.data().displayOrder > docOrder) {
					committeeRef.doc(doc.data().id).update({ displayOrder: firestore.FieldValue.increment(-1) })
						.then(() => Promise.resolve())
						.catch(error => Promise.reject(error));
				}
			});
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};

export const changeCommitteeLevel = async (committee : Committee) => {
	const committeeCollection = getCommitteeCollection();
	const docSnap = await committeeCollection.where('id', '==', committee.id).get();
	const snapshot = await committeeCollection.orderBy('displayOrder', 'asc').get();
	let maxOrder: number = -1;
	let minOrder: number = -1;
	let decrement: boolean = false;

	// Checks if we try to set an order that is out of bounds or is the same.
	if (committee.displayOrder < 0 || committee.displayOrder >= snapshot.size)
		return;

	/**
	 * Store the minimum displayOrder and maximum displayOrder we can iterate from.
	 * We want to either increment or decrement each committee's displayOrder by 1 depending on whether we're shifting a committee's
	 * displayOrder up or down.
	 * We store both orders to know the range of committees that must be modified.
	 */
	docSnap.forEach((doc: { id: any; data: () => any; }) => {
		// We're shifting our committee back.
		if (committee.displayOrder > doc.data().displayOrder) {
			maxOrder = committee.displayOrder;
			minOrder = doc.data().displayOrder;
			decrement = true;
		}
		// We're shifting our committee up.
		else if (doc.data().displayOrder > committee.displayOrder) {
			maxOrder = doc.data().displayOrder;
			minOrder = committee.displayOrder;
		}
		// We make no changes.
		else {
			return;
		}
	});

	committeeCollection.doc(committee.id).update({ displayOrder: committee.displayOrder })
		.then(async () => {
			const snapshot = await committeeCollection.orderBy('displayOrder', 'asc').get();

			snapshot.forEach((doc: { id: any; data: () => any; }) => {
				/**
				 * While this committee's displayOrder is less than our maximum displayOrder,
				 * we either increment or decrement.
				 * We also want to ensure that we don't accidently modify our already modified committee's displayOrder.
				 */
				if (minOrder <= doc.data().displayOrder && doc.data().displayOrder <= maxOrder &&
					doc.data().id != committee.id) {
					// We have to decrement all displayOrder values in our range if we shifted our committee back.
					if (decrement) {
						committeeCollection.doc(doc.data().id).update({
							displayOrder: firestore.FieldValue.increment(-1)
						})
							.then(() => Promise.resolve())
							.catch(error => Promise.reject(error));
					}
					// We have to increment all displayOrder values in our range if we shifted our committee up.
					else {
						committeeCollection.doc(doc.data().id).update({
							displayOrder: firestore.FieldValue.increment(1)
						})
							.then(() => Promise.resolve())
							.catch(error => Promise.reject(error));
					}
				}
			});
		})
		.then(() => Promise.resolve())
		.catch(error => Promise.reject(error));
};