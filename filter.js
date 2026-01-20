let last = {x:0,y:0,z:0};
const alpha = 0.3;

export function smooth(x,y,z){
  last.x = alpha*x + (1-alpha)*last.x;
  last.y = alpha*y + (1-alpha)*last.y;
  last.z = alpha*z + (1-alpha)*last.z;
  return [last.x,last.y,last.z];
}
