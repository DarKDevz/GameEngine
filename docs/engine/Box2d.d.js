var RAPIER;
((RAPIER2) => {
  let RawJointType;
  ((RawJointType2) => {
    RawJointType2[RawJointType2["Revolute"] = 0] = "Revolute";
    RawJointType2[RawJointType2["Fixed"] = 1] = "Fixed";
    RawJointType2[RawJointType2["Prismatic"] = 2] = "Prismatic";
    RawJointType2[RawJointType2["Generic"] = 3] = "Generic";
  })(RawJointType = RAPIER2.RawJointType || (RAPIER2.RawJointType = {}));
  let RawMotorModel;
  ((RawMotorModel2) => {
    RawMotorModel2[RawMotorModel2["AccelerationBased"] = 0] = "AccelerationBased";
    RawMotorModel2[RawMotorModel2["ForceBased"] = 1] = "ForceBased";
  })(RawMotorModel = RAPIER2.RawMotorModel || (RAPIER2.RawMotorModel = {}));
  let RawJointAxis;
  ((RawJointAxis2) => {
    RawJointAxis2[RawJointAxis2["X"] = 0] = "X";
    RawJointAxis2[RawJointAxis2["Y"] = 1] = "Y";
    RawJointAxis2[RawJointAxis2["AngX"] = 2] = "AngX";
  })(RawJointAxis = RAPIER2.RawJointAxis || (RAPIER2.RawJointAxis = {}));
  let RawRigidBodyType;
  ((RawRigidBodyType2) => {
    RawRigidBodyType2[RawRigidBodyType2["Dynamic"] = 0] = "Dynamic";
    RawRigidBodyType2[RawRigidBodyType2["Fixed"] = 1] = "Fixed";
    RawRigidBodyType2[RawRigidBodyType2["KinematicPositionBased"] = 2] = "KinematicPositionBased";
    RawRigidBodyType2[RawRigidBodyType2["KinematicVelocityBased"] = 3] = "KinematicVelocityBased";
  })(RawRigidBodyType = RAPIER2.RawRigidBodyType || (RAPIER2.RawRigidBodyType = {}));
  let RawFeatureType;
  ((RawFeatureType2) => {
    RawFeatureType2[RawFeatureType2["Vertex"] = 0] = "Vertex";
    RawFeatureType2[RawFeatureType2["Face"] = 1] = "Face";
    RawFeatureType2[RawFeatureType2["Unknown"] = 2] = "Unknown";
  })(RawFeatureType = RAPIER2.RawFeatureType || (RAPIER2.RawFeatureType = {}));
  let RawShapeType;
  ((RawShapeType2) => {
    RawShapeType2[RawShapeType2["Ball"] = 0] = "Ball";
    RawShapeType2[RawShapeType2["Cuboid"] = 1] = "Cuboid";
    RawShapeType2[RawShapeType2["Capsule"] = 2] = "Capsule";
    RawShapeType2[RawShapeType2["Segment"] = 3] = "Segment";
    RawShapeType2[RawShapeType2["Polyline"] = 4] = "Polyline";
    RawShapeType2[RawShapeType2["Triangle"] = 5] = "Triangle";
    RawShapeType2[RawShapeType2["TriMesh"] = 6] = "TriMesh";
    RawShapeType2[RawShapeType2["HeightField"] = 7] = "HeightField";
    RawShapeType2[RawShapeType2["Compound"] = 8] = "Compound";
    RawShapeType2[RawShapeType2["ConvexPolygon"] = 9] = "ConvexPolygon";
    RawShapeType2[RawShapeType2["RoundCuboid"] = 10] = "RoundCuboid";
    RawShapeType2[RawShapeType2["RoundTriangle"] = 11] = "RoundTriangle";
    RawShapeType2[RawShapeType2["RoundConvexPolygon"] = 12] = "RoundConvexPolygon";
    RawShapeType2[RawShapeType2["HalfSpace"] = 13] = "HalfSpace";
  })(RawShapeType = RAPIER2.RawShapeType || (RAPIER2.RawShapeType = {}));
  class RawBroadPhase {
  }
  RAPIER2.RawBroadPhase = RawBroadPhase;
  class RawCCDSolver {
  }
  RAPIER2.RawCCDSolver = RawCCDSolver;
  class RawCharacterCollision {
  }
  RAPIER2.RawCharacterCollision = RawCharacterCollision;
  class RawColliderSet {
  }
  RAPIER2.RawColliderSet = RawColliderSet;
  class RawContactForceEvent {
  }
  RAPIER2.RawContactForceEvent = RawContactForceEvent;
  class RawContactManifold {
  }
  RAPIER2.RawContactManifold = RawContactManifold;
  class RawContactPair {
  }
  RAPIER2.RawContactPair = RawContactPair;
  class RawDebugRenderPipeline {
  }
  RAPIER2.RawDebugRenderPipeline = RawDebugRenderPipeline;
  class RawDeserializedWorld {
  }
  RAPIER2.RawDeserializedWorld = RawDeserializedWorld;
  class RawEventQueue {
  }
  RAPIER2.RawEventQueue = RawEventQueue;
  class RawGenericJoint {
  }
  RAPIER2.RawGenericJoint = RawGenericJoint;
  class RawImpulseJointSet {
  }
  RAPIER2.RawImpulseJointSet = RawImpulseJointSet;
  class RawIntegrationParameters {
    /**
    */
    allowedLinearError;
    /**
    */
    dt;
    /**
    */
    erp;
    /**
    */
    maxCcdSubsteps;
    /**
    */
    maxStabilizationIterations;
    /**
    */
    maxVelocityFrictionIterations;
    /**
    */
    maxVelocityIterations;
    /**
    */
    minIslandSize;
    /**
    */
    predictionDistance;
  }
  RAPIER2.RawIntegrationParameters = RawIntegrationParameters;
  class RawIslandManager {
  }
  RAPIER2.RawIslandManager = RawIslandManager;
  class RawKinematicCharacterController {
  }
  RAPIER2.RawKinematicCharacterController = RawKinematicCharacterController;
  class RawMultibodyJointSet {
  }
  RAPIER2.RawMultibodyJointSet = RawMultibodyJointSet;
  class RawNarrowPhase {
  }
  RAPIER2.RawNarrowPhase = RawNarrowPhase;
  class RawPhysicsPipeline {
  }
  RAPIER2.RawPhysicsPipeline = RawPhysicsPipeline;
  class RawPointColliderProjection {
  }
  RAPIER2.RawPointColliderProjection = RawPointColliderProjection;
  class RawPointProjection {
  }
  RAPIER2.RawPointProjection = RawPointProjection;
  class RawQueryPipeline {
  }
  RAPIER2.RawQueryPipeline = RawQueryPipeline;
  class RawRayColliderIntersection {
  }
  RAPIER2.RawRayColliderIntersection = RawRayColliderIntersection;
  class RawRayColliderToi {
  }
  RAPIER2.RawRayColliderToi = RawRayColliderToi;
  class RawRayIntersection {
  }
  RAPIER2.RawRayIntersection = RawRayIntersection;
  class RawRigidBodySet {
  }
  RAPIER2.RawRigidBodySet = RawRigidBodySet;
  class RawRotation {
    /**
    * The rotation angle in radians.
    */
    angle;
    /**
    * The imaginary part of this complex number.
    */
    im;
    /**
    * The real part of this complex number.
    */
    re;
  }
  RAPIER2.RawRotation = RawRotation;
  class RawSerializationPipeline {
  }
  RAPIER2.RawSerializationPipeline = RawSerializationPipeline;
  class RawShape {
  }
  RAPIER2.RawShape = RawShape;
  class RawShapeColliderTOI {
  }
  RAPIER2.RawShapeColliderTOI = RawShapeColliderTOI;
  class RawShapeContact {
  }
  RAPIER2.RawShapeContact = RawShapeContact;
  class RawShapeTOI {
  }
  RAPIER2.RawShapeTOI = RawShapeTOI;
  class RawVector {
    /**
    * The `x` component of this vector.
    */
    x;
    /**
    * The `y` component of this vector.
    */
    y;
  }
  RAPIER2.RawVector = RawVector;
})(RAPIER || (RAPIER = {}));
