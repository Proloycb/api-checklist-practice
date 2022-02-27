const loadPhotos = () => {
    fetch ('https://jsonplaceholder.typicode.com/photos')
        .then(res => res.json())
        .then(data => displayPhotos(data));
}
loadPhotos();

const displayPhotos = photos => {
    const container = document.getElementById('photo-container');
    photos.forEach(photo => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick = "loadDetail(${photo.id})" class="card h-100">
                <img src="${photo.url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${photo.title}</h5>
                </div>
            </div>
        `;
        container.appendChild(div);
    })
    console.log(photos)
}

const loadDetail = id => {
    url = `https://jsonplaceholder.typicode.com/photos/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhotosDetails(data));

}

const displayPhotosDetails = photo => {
    const detailContainer = document.getElementById('detail-area');
    detailContainer.textContent='';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card h-100">
        <div class="row row-cols-md-2">
            <img src="${photo.url}" alt="...">
            <img src="${photo.thumbnailUrl}" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title text-center">${photo.title}</h5>
        </div>
    </div>
    `;
    detailContainer.appendChild(div);
}