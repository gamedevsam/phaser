function SetSkew(skewX, skewY, ...child) {
    child.forEach(entity => {
        entity.transform.setSkew(skewX, skewY);
    });
}

export { SetSkew };
