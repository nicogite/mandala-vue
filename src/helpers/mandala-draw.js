import * as d3 from 'd3';

const charNumberAssociation = {
    'a' : 1,
    'b' : 2,
    'c' : 3,
    'd' : 4,
    'e' : 5,
    'f' : 6,
    'g' : 7,
    'h' : 8,
    'i' : 9,
    'j' : 1,
    'k' : 2,
    'l' : 3,
    'm' : 4,
    'n' : 5,
    'o' : 6,
    'p' : 7,
    'q' : 8,
    'r' : 9,
    's' : 1,
    't' : 2,
    'u' : 3,
    'v' : 4,
    'w' : 5,
    'x' : 6,
    'y' : 7,
    'z' : 8
}

const colorCodes = {
    'jaune' : '#FFFF00',
    'ciel' : '#87CEEB',
    'turquoise' : '#40e0d0',
    'rose' : '#ffc0cb',
    'orange' : '#FFA500',
    'violet' : '#800080',
    'rouge' : '#FF0000',
    'indigo' : '#4B0082',
    'vert' : '#008000'
}

const colorCodes_2 = {
    'jaune' : '#DCB11C',
    'ciel' : '#00D3FF',
    'turquoise' : '#00D5C6',
    'rose' : '#FF7D7C',
    'orange' : '#FFA033',
    'violet' : '#A033ff',
    'rouge' : '#FF5733',
    'indigo' : '#37B8FF',
    'vert' : '#80C943'
}

const colorCodes_5 = {
    //Clair
    'jaune' : '#FFEE00',    // OK
    'turquoise' : '#25FDE9', // A tester : #00E9DF
    'rose' : '#F1017B', // A tester : #FF77A9  & #F1017B   

    //Moyen
    'ciel' : '#009CFF',     // A tester : #009CFF 
    'vert' : '#00BE06',      // OK
    'orange' : '#F25319',   // OK
    
    // Foncé
    'violet' : '#7231A7',   // A tester : #610E8F   
    'rouge' : '#BE0A31',
    'indigo' : '#3B0096',
    
}

const colorCodes_6 = {
    //Clair
    'jaune' : '#FFEE00',    // OK
    'turquoise' : '#25FDE9', 
    'rose' : '#F1017B',   

    //Moyen
    'ciel' : '#009CFF', 
    'vert' : '#00BE06',      // OK
    'orange' : '#F25319',   // OK
    
    // Foncé
    'violet' : '#7231A7',   
    'rouge' : '#BE0A31',
    'indigo' : '#3B0096',
    
}

const colorGrid = [
    ['rouge', 'indigo', 'vert', 'jaune', 'ciel', 'turquoise', 'rose', 'orange', 'violet'],
    ['indigo', 'vert', 'jaune', 'ciel', 'turquoise', 'rose', 'orange', 'violet', 'rouge'],
    ['vert', 'jaune', 'ciel', 'turquoise', 'rose', 'orange', 'violet', 'rouge', 'indigo'],
    ['jaune', 'ciel', 'turquoise', 'rose', 'orange', 'violet', 'rouge', 'indigo', 'vert'],
    ['ciel', 'turquoise', 'rose', 'orange', 'violet', 'rouge', 'indigo', 'vert', 'jaune'],
    ['turquoise', 'rose', 'orange', 'violet', 'rouge', 'indigo', 'vert', 'jaune', 'ciel'],
    ['rose', 'orange', 'violet', 'rouge', 'indigo', 'vert', 'jaune', 'ciel', 'turquoise'],
    ['orange', 'violet', 'rouge', 'indigo', 'vert', 'jaune', 'ciel', 'turquoise', 'rose'],
    ['violet', 'rouge', 'indigo', 'vert', 'jaune', 'ciel', 'turquoise', 'rose', 'orange']
];

export function generateMandalaSvg(mandalaOptions) {

    const mandalaDepth = 12;

    // NUMEROLOGIE

    const mandalaName = mandalaOptions.mandalaName
    const mandalaSvgIdentifier = mandalaOptions.mandalaSvgIdentifier

    let initialName = mandalaName.toLowerCase().replace(/ /g,'');
    
    // Cas spécifique 3, 4 ou 5 lettres
    console.log(initialName.length);
    if (initialName.length < 6) {
        console.log(initialName.substring(initialName.length * 2 - 6));
        initialName += initialName.substring(initialName.length * 2 - 6);
    }

    console.log(initialName);

    let mirrorName = '';
    for(let i=initialName.length -1; i>=0; i--) {
        mirrorName += initialName[i];
    }
    console.log(mirrorName);
    const finalName = initialName + mirrorName;
    console.log(finalName);

    


    let finalTab = finalName.split('');
    console.log('Tableau de caractères :');
    console.log(finalTab);

    //Conversion en nombres
    finalTab = finalTab.map(char => {
        return charNumberAssociation[char];
    })

    console.log('Conversion en nombres :');
    console.log(finalTab);


    /*
     * a Int
     * b Int
     * return Int
     */
    function getFinalNumber(a, b) {
        let c = a + b;
        if (c > 9) {
            let str = c.toString();
            let total = 0;
            c = str
                .split('')
                .map(char => { return Number(char) })
                .reduce((total, curr) => { return total + curr });
        }
        return c;
    }


    console.log('Reduction du tableau !');

    let allTabs = [finalTab];

    while (finalTab.length > 1) {
        let newTab = [];
        for (let i=0; i<finalTab.length-1; i++) {
            newTab.push(getFinalNumber(finalTab[i], finalTab[i+1]))
        }
        console.log('Tableau intermédiaire :');
        console.log(newTab);
        allTabs.push(newTab);
        finalTab = newTab;
    }

    console.log('On Remonte 12 tableaux en arrière : ');
    console.log(allTabs);
    const chosenTab = allTabs[allTabs.length - 12];
    console.log('L\'heureux élu :');
    console.log(chosenTab);
    const chosenNumber = chosenTab[0];
    console.log('On garde son premier nombre : ' + chosenNumber);


    // COULEURS

    

    // A partir du nombre obtenu, on récupère la ligne correspondante dans la grille des couleurs.

    const colorList = colorGrid[chosenNumber - 1];

    console.log('Liste de couleurs : ');
    console.log(colorList);

    // On remonte ensuite les tableaux successifs en partant du dernier (celui à un élément), afin d'obtenir des numéros de couleurs pour colorer les éléments en partant du centre
    // Le nombre du dernier tableau : la couleur de tous les fragments du centre
    // Les deux nombres du tableau suivant : la couleur de tous les fragments autour
    // Les 3 nombres ensuite : les nombres extérieurs pour les fragments extérieurs (la grosse flèche), et le nombre du milieu... pour le fragment du milieu
    // ...

    // Couleurs de lignes
    let lineColors = [];

    console.log('Set line color');
    
    for (let i=0; i<mandalaDepth; i++) {
        //console.log('Line '+i);
        let newLine = [];
        for (let j=allTabs.length -1; j>=(allTabs.length - mandalaDepth); j--) {
            /*console.log('get alltabs index : '+j);
            console.log(allTabs[j]);
            console.log('Get number at index :'+i);
            console.log(allTabs[j][i]);
            console.log('color : ');
            console.log(colorList[allTabs[j][i]-1]);*/   
            if (typeof allTabs[j][i] != 'undefined') {
                newLine.push(colorList[allTabs[j][i]-1]);
            }
        }
        lineColors.push(newLine);

    }

    console.log('lineColors');
    console.log(lineColors);

    

    /*for (i=allTabs.length - 1; i >= 0 ; i--) {
        lineColors.push(allTabs[i].map(colorIndex => colorList[colorIndex-1]));

    }*/

    // MANDALA

    //const svg = d3.select("#mandala");
    const svg = d3.select(`#${mandalaSvgIdentifier}`);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;
    const nbCircles = mandalaDepth; // Nombre de cercles concentriques
    const nbRhombuses = mandalaDepth; // Nombre de losanges du premier cercle
    const radiusIncrement = 15; // Incrément de rayon entre les cercles
    //const rhombuseHeight = 60;
    
    // Get highest size, depending of available space
    const rhombuseEdge = Math.floor(width / (2 * mandalaDepth +2)); // Taille d'un côté du losange
    
    const rhombuseAngle = 2 * Math.PI / nbRhombuses; // Angle d'un losange, déterminé par le nombre de losange du premier cercle
    const rhombuseAngleDegres = 360 / nbRhombuses; // Angle d'un losange, en degré
    const rhombuseHeight = 2 * rhombuseEdge * Math.cos(rhombuseAngle / 2);
    const rhombuseWidth = 2 * rhombuseEdge * Math.sin(rhombuseAngle / 2); // Largeur du losange
    const distanceFromCenter = [rhombuseEdge, rhombuseHeight, rhombuseEdge, 0];  // Distances successives des points du losange par rapport au centre

    
    console.log('START');
    console.log('Rhombuses height : '+rhombuseHeight);
    console.log('Rhombuses angle : '+rhombuseAngle);
    console.log('Rhombuses edge : '+rhombuseEdge);
    console.log('Rhombuses width : '+rhombuseWidth);

    // Créer les losanges du premier faisceau
    const xOffset = rhombuseEdge * Math.cos(rhombuseAngle);
    const yOffset = rhombuseEdge * Math.sin(rhombuseAngle);

    // Boucle sur chacun des faisceaux, en appliquant une rotation
    for (let k = 0; k<nbRhombuses; k++) {

        const rotation = `rotate(${k * rhombuseAngleDegres}, ${centerX}, ${centerY})`;

        // Boucle sur chacun des cercles concentriques (ie profondeur du mandala)
        for (let j=0; j<nbCircles; j++) {

            // Récupère la liste de couleur pour la ligne
            let lineColorList = lineColors[j];
            //console.log('line '+j+' colors');
            //console.log(lineColorList);

            // Boucle sur chaque ligne de losanges à construire, de la plus grande à la plus petite
            for (let i=0; i<(nbCircles - j); i++) {

                const points = [];
                for (let k = 0; k<4; k++) {
                    points.push({
                            x: centerX + distanceFromCenter[k] * Math.cos((k%3) * rhombuseAngle / 2) + i * rhombuseEdge + j * xOffset, 
                            y: centerY + distanceFromCenter[k] * Math.sin((k%3) * rhombuseAngle / 2) + j * yOffset
                            });              
                }

                let displayClass = 'rhombus';
                let colorClass = lineColorList[i];
                let animateClass = 'animate_'+(i+j);
                let fillOpacityDelay = (i+j) * mandalaOptions.fillOpacityDelay;
                    svg.append("polygon")
                        .attr("points", points.map(p => `${p.x},${p.y}`).join(" "))
                        .attr("class", `${displayClass} ${colorClass} animate ${animateClass}`)
                        .attr("transform", rotation)
                        //.attr("fill-opacity", "0")
                        .style("fill", colorCodes_6[colorClass])
                        .style("stroke", '#555')
                        .style("stroke-width", '1')
                        .style("stroke-opacity", '0')
                        .style("transition", `fill-opacity ${fillOpacityDelay}s`)
                        //.style("transition", `stroke-opacity ${fillOpacityDelay}s`)


            }
       }

    }

}
