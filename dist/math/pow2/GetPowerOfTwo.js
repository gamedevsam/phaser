function GetPowerOfTwo(value) {
    const index = Math.log(value) / 0.6931471805599453;
    return (1 << Math.ceil(index));
}

export { GetPowerOfTwo };
