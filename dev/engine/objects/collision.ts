function collide(rect1: xywhObject, rect2: xywhObject) {
   return HandleCollision('Rect', 'RectVector', rect1, { x: rect1.width, y: rect1.height }, rect2, { x: rect2.width, y: rect2.height })
}
function collideCircle(rect: xywhObject, circle: { r: number }) {
   return HandleCollision('Rect', 'CircleVector', rect, { x: rect.width, y: rect.height }, circle, circle.r * 2)
}
function checkRectangleCircleIntersection(x1: number, y1: number, width: number, height: number, cx: number, cy: number, r: number) {
   // Calculate the closest point on the rectangle to the center of the circle
   let closestX = Math.max(x1, Math.min(cx, x1 + width));
   let closestY = Math.max(y1, Math.min(cy, y1 + height));

   // Calculate the distance between the closest point and the center of the circle
   let distanceX = Math.abs(closestX - cx);
   let distanceY = Math.abs(closestY - cy);
   let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

   // Determine if the distance is less than or equal to the radius
   return distance <= r;
}