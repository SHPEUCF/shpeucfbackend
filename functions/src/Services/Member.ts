
// editMember = user => {
//     const { firstName, lastName, points, id } = user;

//     firebase.database().ref(`/users/${id}/`).update(user)
//         .then(() => firebase.database().ref(`/points/${id}/`).update({
//             firstName,
//             lastName,
//             points
//         }))
//         .then(() => firebase.database().ref(`/privileges/${id}/`).update({
//             firstName,
//             lastName,
//             user: true,
//             board: false,
//             eboard: false,
//             president: false
//         }))
//         .then(() => Alert.alert("Account Updated"));
// };