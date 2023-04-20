let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");

createTable()
async function addAlbum(album) {
  const result = await fetch('http://localhost:3000/api/albums', {
    method: 'POST',
    body: JSON.stringify(album),
    headers: { 'content-type': 'application/json' }
  })
  return result;
}

addData.addEventListener('click', async () => {
  console.log("hello")
  var title = titleText.value
  var artist = artistText.value
  var year = yearText.value
  console.log(title, artist, year)
  await addAlbum({ title:title, artist:artist, year:year })

  console.log(title, artist, year)

});
async function getAlbums() {
  try {
    var result = await fetch('http://localhost:3000/api/albums', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    });
    console.log(result)
    var rest = result.json();
    return (rest)
  } catch (error) {
    console.log(error)
  }
}


async function updateAlbum(id, album) {
  const result = await fetch('http://localhost:3000/api/albums/'+id, {
    method: 'PUT',
    body: JSON.stringify(album),
    headers: { 'content-type': 'application/json' }
  })
  return result
}

addData.addEventListener('click', async () => {

  var title = titleText.value
  var artist = artistText.value
  var year = yearText.value
  
  await updateAlbum({ title:title, artist:artist, year:year })



  console.log(title, artist, year)

});

async function deleteAlbum(id, album) {
  const result = await fetch('http://localhost:3000/api/albums/'+id, {
    method: 'DELETE',
    body: JSON.stringify(album),
    headers: { 'content-type': 'application/json' }
  })
}

deleteData.addEventListener('click', async () => {
  var title = titleText.value
  var artist = artistText.value
  var year = yearText.value
  
  await deleteAlbum({ title: title, artist: artist, year: year })

  console.log(title, artist, year)

});

function createTable() {
  let album = getAlbums()
  let allAlbums = ''
  album.then(text => {
    console.log(text)
    var headers = Object.keys(text[0])
    console.log(headers)
  var headerRow = '<tr>';
  for (let i = 0; i < headers.length; i++){
    headerRow += '<th>' + headers[i] + '</th>'
    }
    headerRow += '</th>'
    console.log(headerRow)
  
  
  for (let i = 0; i < text.length; i++){
    allAlbums += '<tr>'
    console.log(text[i])
    for (let j = 0; j < headers.length; j++){
      let header = headers[j]
      allAlbums += '<td contenteditable="true">' + text[i][header] + '<td>'
    }
    allAlbums += '<button type="button" id="updateButton" onClick="editAlbum(this)">update album</button>'
    allAlbums += '<button type="button" id="deleteButton" onClick="deleteMusic(this)">delete album</button>'
    allAlbums += '<button type="button" id="deleteButton" onClick="detail(this)">detail</button>'
    
    allAlbums += '</tr>'
   
    console.log(allAlbums)
  }
  var table = document.getElementById("music_Albums")
  table.innerHTML = headerRow + allAlbums
    
    

    
    // document.getElementById("showAlbums").innerHTML = text.array.forEach(element => {
      
    // });
  })

  
}
async function deleteMusic(t) {
  res = t.parentElement.parentElement
  d = {
    "title": res.cells[2].innerHTML,
    "artist": res.cells[4].innerHTML,
    "year": res.cells[6].innerHTML
  }
  res = await deleteAlbum(res.cells[0].innerHTML, d)
  createTable()
      
      
    }

async function editAlbum(t) {
  res = t.parentElement.parentElement
  d = {
    "title": res.cells[2].innerHTML,
    "artist": res.cells[4].innerHTML,
    "year": res.cells[6].innerHTML
  }
  console.log(res.cells[0])
  console.log(d)
  res = await updateAlbum(res.cells[0].innerHTML, d)
  console.log(res)
      
}

async function detail(t) {
  res = t.parentElement.parentElement
  d = {
    "id": res.cells[0].innerHTML,
    "title": res.cells[2].innerHTML,
    "artist": res.cells[4].innerHTML,
    "year": res.cells[6].innerHTML
  }
  var table1 = document.getElementById("details_Album")
  table1.innerHTML = "<p>" + d["id"] + "</p>" 
  + "<p>" + d["title"] + "</p>" 
  + "<p>" + d["artist"] + "</p>" 
  + "<p>" + d["year"] + "</p>" 
  
}



