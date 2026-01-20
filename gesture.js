export function classifyGesture(landmarks){
  // landmarks[0] = wrist, landmarks[4] = thumb tip, landmarks[8] = index tip, etc
  const thumb = landmarks[4];
  const index = landmarks[8];
  const distance = Math.hypot(thumb.x-index.x, thumb.y-index.y);

  let gesture = {name:'open', scale:1};

  if(distance<0.05) gesture = {name:'pinch', scale:0.8};
  else if(landmarks[0].y - landmarks[9].y > 0.1) gesture = {name:'fist', scale:0.5};
  else gesture = {name:'open', scale:1};

  return gesture;
}
