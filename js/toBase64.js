const loadFile = function (event) {
    const reader = new FileReader()
    reader.onload = function () {
        const output = document.querySelector('#previewLocalImg')
        output.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}