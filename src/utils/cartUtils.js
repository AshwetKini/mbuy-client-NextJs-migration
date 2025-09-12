export const calculateCartItemPrice = (item, quantity) => {
  if (quantity >= 1 && quantity < 101) {
    return Number(item.discountprice2B) * quantity;
  } else if (quantity >= 101 && quantity < 201) {
    return Number(item.price2) * quantity;
  } else if (quantity >= 201 && quantity < 301) {
    return Number(item.price3) * quantity;
  } else if (quantity >= 301 && quantity < 401) {
    return Number(item.price4) * quantity;
  } else if (quantity >= 401 && quantity < 501) {
    return Number(item.price5) * quantity;
  } else {
    return Number(item.price6) * quantity;
  }
};

export const isQuantityValid = (item, quantity) => {
  return quantity >= parseInt(item.minord11A) && quantity <= parseInt(item.maxord11B);
};

export const getPriceForQuantityRange = (item, quantity) => {
  if (quantity >= parseInt(item.minord11A) && quantity < parseInt(item.minimum1)) {
    return Number(item.discountprice2B);
  } else if (quantity >= parseInt(item.minimum1) && quantity <= parseInt(item.maximum1)) {
    return Number(item.price1);
  } else if (quantity >= parseInt(item.minimum2) && quantity <= parseInt(item.maximum2)) {
    return Number(item.price2);
  } else if (quantity >= parseInt(item.minimum3) && quantity <= parseInt(item.maximum3)) {
    return Number(item.price3);
  } else if (quantity >= parseInt(item.minimum4) && quantity <= parseInt(item.maximum4)) {
    return Number(item.price4);
  } else if (quantity >= parseInt(item.minimum5) && quantity <= parseInt(item.maximum5)) {
    return Number(item.price5);
  } else {
    return Number(item.price6);
  }
}; 