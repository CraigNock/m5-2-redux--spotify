

export const slimNumber = (num) => {
  let slim = `${num}`;
  if( num > 999) {
    slim = `${Math.floor(num/1000)}K`
  } else if (num > 999999) {
    slim = `${Math.floor(num/1000000)}M`
  }
  return slim;
}




export default slimNumber;