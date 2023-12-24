function collide(rect1, rect2) {
  let obj1 = {
    getCollisionType: () => {
      return "Rect";
    },
    getCollisionVectors() {
      return [rect2, { x: rect2.width, y: rect2.height }];
    }
  };
  let obj2 = {
    getCollisionType: () => {
      return "Rect";
    },
    getCollisionVectors() {
      return [rect1, { x: rect1.width, y: rect1.height }];
    }
  };
  return HandleCollision(obj1, obj2);
}
function collideCircle(rect, circle) {
  let obj1 = {
    getCollisionType: () => {
      return "Circle";
    },
    getCollisionVectors() {
      return [circle, circle.r];
    }
  };
  let obj2 = {
    getCollisionType: () => {
      return "Rect";
    },
    getCollisionVectors() {
      return [rect, { x: rect.width, y: rect.height }];
    }
  };
  return HandleCollision(obj1, obj2);
}
function checkRectangleCircleIntersection(x1, y1, width, height, cx, cy, r) {
  let closestX = Math.max(x1, Math.min(cx, x1 + width));
  let closestY = Math.max(y1, Math.min(cy, y1 + height));
  let distanceX = Math.abs(closestX - cx);
  let distanceY = Math.abs(closestY - cy);
  let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  return distance <= r;
}
