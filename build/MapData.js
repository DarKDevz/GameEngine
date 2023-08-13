MapData = { data: `{"0":[[0,150,250,170,50],[0,350,100,100,50],[0,-1,400,810,32],[1,610,200,60,100],[0,600,300,150,32],[0,600,300,32,100],[2,388,350,60,50,0,500],[5,529,73,0,25],[5,294,58,0,25]],"1":[[0,350,100,100,50],[0,-1,400,890,32],[0,600,300,260,32],[0,860,300,10,100],[2,447,350,60,50,350,600],[3,500,330,"S to crouch"],[1,790,350,60,50]],"2":[[0,150,250,170,50],[0,350,100,100,50],[0,-1,400,810,32],[0,50,360,50,32],[0,600,300,150,32],[0,600,300,32,100],[2,337,13,50,50,90,590],[0,-160,-50,150,50],[0,-372,268,150,50],[0,-766,168,150,50],[0,-1205,-60,150,50],[0,-133,-3,50,350],[0,-1354,-441,150,50],[0,-1551,-223,150,50],[0,-984,-643,150,50],[0,-407,-758,150,50],[1,48,-843,50,25]],"3":[[0,-83,84,150,50],[0,322,90,150,50],[0,147,-21,50,100],[0,532,-89,50,100],[2,607,-315,100,50,500,800],[0,1130,-426,150,50],[0,1398,-478,50,100],[0,1514,-488,150,50],[0,1492,-1061,150,500],[0,1831,-566,150,50],[1,2225,-808,50,50]],"4":[[0,401,64,50,50],[0,451,-22,30,89],[0,375,-85,117,64],[0,323,-57,26,1],[0,346,-55,36,62],[0,292,69,109,46],[0,113,68,99,48],[0,-53,-39,99,45],[0,-97,-173,99,48],[2,16,-203,199,85,-17,483],[4,108,-179,44,37],[4,190,-180,58,41],[4,21,-181,258,43],[4,21,-181,258,43],[0,712,-130,126,38],[0,712,-130,126,38],[0,1127,173,32,29],[0,1377,180,43,27],[4,1495,7,59,38],[0,1612,-15,52,47],[0,-314,42,75,47],[0,1202,-307,38,188],[4,676,-212,0,0],[4,602,-331,107,187],[0,1201,-499,40,140],[0,1936,-17,51,40],[0,2711,-23,125,37],[4,2712,-97,75,80],[1,2839,16,34,14],[4,2924,-118,31,128]],"5":[[0,96,64,438,434],[0,389,-79,139,51],[0,1770,-191,380,123],[0,2312,-212,173,101],[0,2632,-75,81,134],[0,2859,39,112,130],[0,3051,115,104,101],[0,3277,179,113,86],[0,3502,246,58,52],[0,3645,258,170,108],[0,3977,325,230,133],[0,4371,442,336,140],[0,4933,549,315,171],[0,5286,349,255,78],[0,5391,231,134,33],[4,5277,-203,136,470],[1,5888,266,90,65],[4,5695,173,140,415],[0,4704,-118,275,500],[4,5777,-370,140,415],[3,547,-183,"Vai tutto a destra scemu"]],"6":[[0,-35,-269,127,385],[0,170,241,817,383],[5,422,165,0,50],[0,309,41,385,68],[0,2169,181,659,234],[5,1192,53,0,40],[5,2246,116,0,50],[0,3523,-46,1000,88],[0,4801,-175,1000,88],[4,943,-148,89,242],[0,6056,-304,1000,88],[1,6968,-430,53,105]],"7":[[0,-222,-111,428,150],[0,-227,-552,27,427],[4,-165,-383,400,103],[0,374,-170,214,126],[5,11,-468,0,1],[3,476,-277,"vai tutto dritto- cit.sponton"],[3,520,-336,"a destra-sponton"],[0,1512,-250,643,172],[0,3268,-313,389,122],[0,4635,-356,608,176],[0,4774,-375,53,199],[0,4734,-544,131,455],[4,4769,-695,59,71],[1,5021,-502,125,142]],"0l":[0,400,-10,500],"1l":[1,400,-10,500],"2l":[2,400,-10,500],"3l":[3,400,-10,500],"4l":[4,400,-10,500],"5l":[5,400,-10,500],"6l":[6,400,150,500],"7l":[7,0,-500,500],"0c":[{"7":[{"name":"gameScript","params":{"fn":"this.onCollide = () => {let managerObject = this;function overrideLateUpdate() {class OverriddenEnemy extends Enemy {lateUpdate() {textSize(16);fill(0);text(this.health, this.x, this.y);let speed = 0.025;let playerPos = player.pos;let targetX = playerPos.x + 100;let targetY = playerPos.y;this.x = lerp(this.x, targetX, speed);this.y = lerp(this.y, targetY, speed);if (this.health <= 0) {removeObject(engine.scene[activeLevel].boxes.indexOf(this));managerObject.enemyMade = false;}super.lateUpdate();}}let enemy = new OverriddenEnemy(player.pos.x + 100, player.pos.y, player.size.x, player.size.y);enemy.typeId = undefined;enemy.isShootable = true;enemy.health = 100;engine.scene[activeLevel].boxes.push(enemy);engine.scene[activeLevel].reloadBoxes();}if (!this.enemyMade) {overrideLateUpdate();}this.enemyMade = true;}"}}]},{"8":[{"name":"gameScript","params":{"fn":"this.onCollide = () => {player.shootingDelay = 50;}"}}]}],"1c":[],"2c":[],"3c":[],"4c":[],"5c":[],"6c":[{"2":[{"name":"gameScript","params":{"fn":"this.onCollide = () => {let managerObject = this;player.shootingDelay = Infinity;function overrideLateUpdate() {class OverriddenEnemy extends Enemy {earlyUpdate() {if (this.collision(player)) {player.playerDeath();this.health = 100;}super.earlyUpdate();}lateUpdate() {textSize(16);fill(0);text(this.health, this.x, this.y);let speed = 0.025;let playerPos = player.pos;let targetX = playerPos.x + this.dirX;let targetY = playerPos.y + this.dirY;this.x = lerp(this.x, targetX, speed);this.y = lerp(this.y, targetY, speed);if (this.health <= 0) {removeObject(engine.scene[activeLevel].boxes.indexOf(this));managerObject.enemyMade = false;}super.lateUpdate();}}let enemy = new OverriddenEnemy(player.pos.x + 100, player.pos.y, player.size.x, player.size.y);enemy.typeId = undefined;enemy.isShootable = true;enemy.health = 100;enemy.dirX = 100;enemy.dirY = 0;engine.scene[activeLevel].boxes.push(enemy);engine.scene[activeLevel].reloadBoxes();}if (!this.enemyMade) {overrideLateUpdate();}this.enemyMade = true;}"}}]},{"5":[{"name":"gameScript","params":{"fn":"this.onCollide = () => {player.shootingDelay = 50;}"}}]},{"6":[{"name":"gameScript","params":{"fn":"this.onCollide = () => {let managerObject = this;function overrideLateUpdate() {class OverriddenEnemy extends Enemy {earlyUpdate() {if (this.collision(player)) {player.playerDeath();this.health = 100;}super.earlyUpdate();}lateUpdate() {textSize(16);fill(0);text(this.health, this.x, this.y);let speed = 0.04;let playerPos = player.pos;let targetX = playerPos.x + this.dirX;let targetY = playerPos.y + this.dirY;this.x = lerp(this.x, targetX, speed);this.y = lerp(this.y, targetY, speed);if (this.health <= 0) {removeObject(engine.scene[activeLevel].boxes.indexOf(this));managerObject.enemyMade = false;}super.lateUpdate();}}let enemy = new OverriddenEnemy(player.pos.x - 100, player.pos.y, player.size.x, player.size.y);enemy.typeId = undefined;enemy.isShootable = true;enemy.health = 100;enemy.dirX = 100;enemy.dirY = 0;engine.scene[activeLevel].boxes.push(enemy);engine.scene[activeLevel].reloadBoxes();}if (!this.enemyMade) {overrideLateUpdate();}this.enemyMade = true;}"}}]}],"7c":[{"4":[{"name":"gameScript","params":{"fn":"player.shootingDelay = 25;"}}]}]}` };
