import moment from "moment"

const FormatTanggal = (tgl, format) =>{
    const today = moment(tgl);
    return today.format(format);
}

const Utils = {
    FormatTanggal
}

export default Utils;