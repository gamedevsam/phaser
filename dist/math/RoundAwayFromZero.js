function RoundAwayFromZero(value) {
    return (value > 0) ? Math.ceil(value) : Math.floor(value);
}

export { RoundAwayFromZero };
