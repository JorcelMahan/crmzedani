
const getValidSizes = (tallas) => {
    const validSizes = []
    for (const prop in tallas) {
        if (tallas[prop] > 0) {
            validSizes.push(prop)
        }
    }
    return validSizes;
}

const ValidSizes = ({ tallas }) => {
    const sizes = getValidSizes(tallas)
    return (
        <>
            {
                sizes.map(size => (
                    <option>{size}</option>
                ))
            }
        </>
    )
}

export default ValidSizes
