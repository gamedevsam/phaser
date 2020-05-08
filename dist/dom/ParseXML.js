function ParseXML(data) {
    let xml;
    try {
        const parser = new DOMParser();
        xml = parser.parseFromString(data, 'text/xml');
        if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
            return null;
        }
        else {
            return xml;
        }
    }
    catch (error) {
        return null;
    }
}

export { ParseXML };
