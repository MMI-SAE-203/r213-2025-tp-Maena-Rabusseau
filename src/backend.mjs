/* Maena Rabusseau Groupe A1*/

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function AllMaisons() {
    let records = await pb.collection('Maison').getFullList();
    console.log( records);
    records = records.map((Maison) => {
        Maison.img = pb.files.getURL(Maison, Maison.images);
        return Maison;
    });

    return records;
}

/*Etape 11 : Ecrire la fonction ”oneID” qui retourne une seule maison en passant l’id de cette maison en ´
param`etre et tester la
export async function oneId(id) {
    const Onerecords = await pb.collection('Maison').getOne(id);
    return Onerecords;
}
    */

/* Etape 12: ´ Ecrire la fonction ”allMaisonsFavori” qui retourne toutes les maisons en favori et tester la. 

export async function allMaisonsFavori() {
    const records = await pb.collection('Maison').getFullList({ filter: 'favori = true', });
    return records;
}

*/

/* Etape 13 : Ecrire la fonction ”allMaisonsSorted” qui retourne toutes les maisons ordonn´ees par ordre crois- ´
sant de leur prix et tester la.


export async function allMaisonsSorted() {
    const records = await pb.collection('Maison').getFullList({ sort: 'prix', });
    return records;
}
*/

/* Etape 14 : Ecrire une fonction ”bySurface” qui prend en param`etre une surface et qui retourne la liste de ´
toutes les maisons ayant une superficie sup´erieur `a surface.

export async function bySurface(s) {
    const records = await pb.collection('Maison').getFullList({ filter: `surface > ${s}`, });
    return records;
}
*/
/* Etape 15 : Ecrire une fonction ”surfaceORprice” qui prend en param`etre une surface et un prix (p) et qui ´
retourne la liste de toutes les maisons ayant une superficie sup´erieur `a surface ou un prix inf´erieur `a p

export async function surfaceORprice(p, s) {
    const records = await pb.collection('Maison').getFullList({ filter: `prix > ${p} && surface > ${s}`, });

    return records;
}
*/




/* a faire avec le prof 
Etape 18. ´ Modifier la collection maison pour ajouter la relation avec la collection agent.
Etape 19. ´ Ajouter une fonction dans le fichier backend.mjs permettant de remonter les donn´ees d’un agent
en passant son id en param`etre.
*/







//backend.mjs
export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}


export async function addOffre(house) {
    try {
        await pb.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}




export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}