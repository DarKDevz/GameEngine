let replacements = {
    "Number":'number',
    "b2Vec2":"Box2D.Common.Math.b2Vec2",
    "b2Mat22":"Box2D.Common.Math.b2Mat22",
    "int":"number",
    "Boolean":"boolean"
}
function parsePropertiesString(inputString,doExtend=false) {
    let interfaceRegex = /\n(\w+)\n/m;
    let result = '';
    let m;
      if ((m = interfaceRegex.exec(inputString)) !== null) {
      // The result can be accessed through the `m`-variable.
      let interfaceName = (m[1]);
      if(doExtend) {
        interfaceName += ' extends '+doExtend
      }
      result += `export interface ${interfaceName} {\n`;
      let regex = /(\w+) : (\w+)/g
      while ((m = regex.exec(inputString)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        let nameOfValue = m[1]
        let type = m[2];
        result+= `${nameOfValue} : ${compileType(type)} \n`
    }
    regex = /(\w+)\(((?:\w+:\w*(?:, |))*)\):(\w+)/gm;
    let allMathches = inputString.matchAll(regex)
    for(let matches of allMathches)
        if (matches) {
        const methodName = matches[1];
        const paramsString = matches[2];
        const returnType = matches[3];

        const paramRegex = /(\w+):(\w*)(?:, |)/g;
        const paramsMatches = [...paramsString.matchAll(paramRegex)];

        const params = paramsMatches.map(paramMatch => ({
            identifier: paramMatch[1],
            type: compileType(paramMatch[2])
        }));
        result += `${methodName}(`;
        let last = (params[params.length-1])
        params.forEach(obj=>{
            result += `${obj.identifier}:${obj.type}${obj.identifier===last.identifier?'':', '}`
        })
        result += `):${compileType(returnType)}\n`;
        }
    result += '}'
      console.log(result);
    }
  }
function compileType(args) {
    return replacements[args]?replacements[args]:args
}









parsePropertiesString(`
Public Properties
 Show Inherited Public Properties
 	Property	Defined by
 	 	localAnchorA : b2Vec2
The local anchor point relative to bodyA's origin.
b2WeldJointDef
 	 	localAnchorB : b2Vec2
The local anchor point relative to bodyB's origin.
b2WeldJointDef
 	 	referenceAngle : Number
The body2 angle minus body1 angle in the reference state (radians).
b2WeldJointDef
Public Methods
 	Method	Defined by
 	 	
b2WeldJointDef()
b2WeldJointDef
 	 	
Initialize(bA:b2Body, bB:b2Body, anchor:b2Vec2):void
Initialize the bodies, anchors, axis, and reference angle using the world anchor and world axis.
b2WeldJointDef

`,)
input = "Initialize(bA:b2Body, bB:b2Body, anchor:b2Vec2):void";