function getHttpObject() {
    var xhr = false;
    if (window.XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}
/**
 * 
 * @param {*} url 要加载的文件路径
 * @param {*} callback 
 * @param {*} imgId 类||id名
 * @param {*} isId bool 是否为id名, 不传参数, imgId默认为类名
 */
function download(url, callback, imgId, isId) {
    var xhr = getHttpObject();
    xhr.open('GET', url, true);        // 也可以使用POST方式，根据接口
    xhr.responseType = "blob";    // 返回类型blob
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = function () {
        // 请求完成
        if (this.status === 200) {
            var blob = this.response;
            var reader = new FileReader();
            reader.readAsText(blob);
            reader.onload = function (e) {
                let aBlob = convertImgDataToBlob(e.target.result);
                let imgBlob = URL.createObjectURL(aBlob);
                callback(imgBlob, imgId, isId)
            }
        }
    };
    // 发送ajax请求
    xhr.send()
}

//图片
function pImg1(imgBlob, imgId, isId) {
    let img1;
    if (isId) {
        img1 = document.getElementById(imgId)
    } else {
        img1 = document.getElementsByClassName(imgId)[0];
    }
    img1.src = imgBlob;
    img1.onload = function () {
        window.URL.revokeObjectURL(imgBlob);
    };
}

var convertImgDataToBlob = function (base64Data) {
    var format = "image/jpeg";
    var base64 = base64Data;
    var code = window.atob(base64.split(",")[1]);
    var aBuffer = new window.ArrayBuffer(code.length);
    var uBuffer = new window.Uint8Array(aBuffer);
    for (var i = 0; i < code.length; i++) {
        uBuffer[i] = code.charCodeAt(i) & 0xff;
    }

    var blob = null;
    try {
        blob = new Blob([uBuffer], { type: format });
    }
    catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new window.BlobBuilder();
            bb.append(uBuffer.buffer);
            blob = bb.getBlob("image/jpeg");

        }
        else if (e.name == "InvalidStateError") {
            blob = new Blob([aBuffer], { type: format });
        }
        else {

        }
    }
    return blob;
};


const imgUrl = "./img/";
download(imgUrl + "1.txt", pImg1, "img1", true);
download(imgUrl + "2.txt", pImg1, "img2");
