export function base64ToXML(base64: string | ArrayBuffer) {    
    function base64ToText(str: string) {
        try {
            return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
        }
        catch (e) {
            throw new Error('base 64 decoding failed on XML')
        }
    }
  
    function parseBase64(base64) {
        var pattern = /^data:([a-z0-9\.\-\+\_\/]+)(?:;([a-z0-9\=\-\_\+]+))*,(.*)$/im;
        var match = base64.match(pattern)
        if (match == null) {
            return {
                data: base64,
                b64: true
            }
        }
  
        return {
            mime: match[1],
            b64: match[2].includes('base64'),
            data: match[3]
        }
    }
  
    const parsed = parseBase64(base64)
    const {b64, data} = parsed
    return b64 ? base64ToText(data) : data
  }

  export function readXMLFile(file: Blob) {
    return new Promise((resolve, reject) => {
        // Check if the file is an image.
        if (file.type && !file.type.includes('xml')) {
            reject('File is not xml.')
        }
        
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
                const res = event?.target?.result
                if (res) {
                    const xml = base64ToXML(res)
                    resolve(xml)
                }
        });
        reader.readAsDataURL(file);
    })
  }