// Given results from the Pearson API, find a result that has a true translation.
// Sometimes a result will have no translation text or a random 'xx'.

export const findTrueTranslation = function(results) {
    return new Promise(function(resolve, reject){
        for(var i=0; i<results.length; i++) {
            if(results[i].senses !== null) {
                if(results[i].senses[0].translations !== undefined) {
                    if(results[i].senses[0].translations[0].example !== undefined) {
                        if(results[i].senses[0].translations[0].example[0].translation !== undefined) {
                            if(!results[i].senses[0].translations[0].example[0].translation.text[0].includes('xx')) {
                                var translations = results[i].senses[0].translations[0].example[0];
                                resolve(translations);
                                break;
                            }
                        }
                    }
                }
            }
        }
    });
}