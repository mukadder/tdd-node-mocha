// functions that are run on the query response
//let fnsToRunOnResponse = [f1, f2, f3, f4]

// mocks yielding the next chunk of data read from file
// the * denotes that this function is a generator in JavaScript
function* getNextChunk() {
    yield 'Bret\nAntonette\nSamantha\nKarianne\nKamren\nLeopoldo_Corkery\nElwyn.Skiles\nMaxime_Nienow\nDelphine\nMoriah.Stanton\n'
}

// getNextUsername takes an iterator that yields the next chunk ending with a newline
// It itself returns an iterator that yields the usernames one at a time
function* getNextUsername(getNextChunk) {
    for (let chunk of getNextChunk()) {
        let lines = chunk.split('\n')

        for (let l of lines) if (l !== '') yield l
    }
}/**
 * Created by mukadder on 2/26/17.
 */
