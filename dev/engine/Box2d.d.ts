namespace Box2D {
  export namespace Collision {
    export namespace Shapes {
      export interface b2Shape {
        ComputeAABB(aabb: b2AABB, xf: b2Transform): void;
        ComputeMass(massData: b2MassData, density: number): void;
        ComputeSubmergedArea(normal: b2Vec2, offset: number, xf: b2Transform, c: b2Vec2): number;
        Copy(): b2Shape;
        GetType(): number;
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, transform: b2Transform): boolean;
        Set(other: b2Shape): void;
        TestOverlap(shape1: b2Shape, transform1: b2Transform, shape2: b2Shape, transform2: b2Transform): boolean;
        TestPoint(xf: b2Transform, p: b2Vec2): boolean;

        m_type: number;
        // Constants
        e_hitCollide: number;
        e_missCollide: number;
        e_startsInsideCollide: number;
        [x: string]: any;
      }
      export interface b2CircleShape extends b2Shape {
        new(radius?: number): b2CircleShape;

        GetLocalPosition(): b2Vec2;
        GetRadius(): number;
        SetLocalPosition(position: b2Vec2): void;
        SetRadius(radius: number): void;
        TestPoint(transform: b2Transform, p: b2Vec2): boolean;
        m_radius: number;
      }
      export interface b2PolygonShape extends b2Shape {
        AsArray(vertices: b2Vec2[], vertexCount: number): b2PolygonShape;
        AsBox(hx: number, hy: number): b2PolygonShape;
        AsEdge(v1: b2Vec2, v2: b2Vec2): b2PolygonShape;
        AsOrientedBox(hx: number, hy: number, center?: b2Vec2, angle?: number): b2PolygonShape;
        AsVector(vertices: b2Vec2[], vertexCount: number): b2PolygonShape;
        GetNormals(): b2Vec2[];
        GetSupport(d: b2Vec2): number;
        GetSupportVertex(d: b2Vec2): b2Vec2;
        GetVertexCount(): number;
        GetVertices(): b2Vec2[];
        SetAsArray(vertices: b2Vec2[], vertexCount?: number): void;
        SetAsBox(hx: number, hy: number): void;
        SetAsEdge(v1: b2Vec2, v2: b2Vec2): void;
        SetAsOrientedBox(hx: number, hy: number, center?: b2Vec2, angle?: number): void;
        SetAsVector(vertices: b2Vec2[], vertexCount?: number): void;
        new(): b2PolygonShape;
      }
      export interface b2EdgeChainDef {
        isALoop: boolean;
        vertexCount: number;
        vertices: b2Vec2[];

        new(): b2EdgeChainDef;
      }
      export interface b2MassData {
        center: b2Vec2;
        I: number;
        mass: number;
      }
    }
    export interface b2AABB {
      lowerBound: b2Vec2;
      upperBound: b2Vec2;

      static Combine(aabb1: b2AABB, aabb2: b2AABB): b2AABB;
      Contains(aabb: b2AABB): boolean;
      GetCenter(): b2Vec2;
      GetExtents(): b2Vec2;
      IsValid(): boolean;
      RayCast(output: b2RayCastOutput, input: b2RayCastInput): boolean;
      TestOverlap(other: b2AABB): boolean;
    }
    export interface b2ContactID {
      features: Features;
      key: number;

      new(): b2ContactID;
      Copy(): b2ContactID;
      Set(id: b2ContactID): void;
    }
    export interface b2ContactPoint {
      friction: number;
      id: b2ContactID;
      normal: b2Vec2;
      position: b2Vec2;
      restitution: number;
      separation: number;
      shape1: b2Shape;
      shape2: b2Shape;
      velocity: b2Vec2;
    }
    export interface b2DistanceInput {
      proxyA: b2DistanceProxy;
      proxyB: b2DistanceProxy;
      transformA: b2Transform;
      transformB: b2Transform;
      useRadii: boolean;
    }
    export interface b2DistanceOutput {
      distance: number;
      iterations: number;
      pointA: b2Vec2;
      pointB: b2Vec2;
    }
    export interface b2DistanceProxy {
      m_count: number;
      m_radius: number;
      m_vertices: b2Vec2[]; // Assuming Vector represents an array of b2Vec2

      GetSupport(d: b2Vec2): number;
      GetSupportVertex(d: b2Vec2): b2Vec2;
      GetVertex(index: number): b2Vec2;
      GetVertexCount(): number;
      Set(shape: b2Shape): void;
    }
    export interface b2DynamicTreeNode {
      new(): b2DynamicTreeNode
      isLeaf: boolean
    }
    export interface b2DynamicTree {
      new(): b2DynamicTree;
      CreateProxy(aabb: b2AABB, userData: any): b2DynamicTreeNode;
      DestroyProxy(proxy: b2DynamicTreeNode): void;
      GetFatAABB(proxy: b2DynamicTreeNode): b2AABB;
      GetUserData(proxy: b2DynamicTreeNode): any;
      MoveProxy(proxy: b2DynamicTreeNode, aabb: b2AABB, displacement: b2Vec2): boolean;
      Query(callback: Function, aabb: b2AABB): void;
      RayCast(callback: Function, input: b2RayCastInput): void;
      Rebalance(iterations: number): void;
    }
    export interface b2DynamicTreeBroadPhase {
      CreateProxy(aabb: b2AABB, userData: any): any;
      DestroyProxy(proxy: any): void;
      GetFatAABB(proxy: any): b2AABB;
      GetProxyCount(): number;
      GetUserData(proxy: any): any;
      MoveProxy(proxy: any, aabb: b2AABB, displacement: b2Vec2): void;
      Query(callback: Function, aabb: b2AABB): void;
      RayCast(callback: Function, input: b2RayCastInput): void;
      Rebalance(iterations: number): void;
      TestOverlap(proxyA: any, proxyB: any): boolean;
      UpdatePairs(callback: Function): void;
      Validate(): void;
    }
    export interface b2Manifold {
      m_localPlaneNormal: b2Vec2;
      m_localPoint: b2Vec2;
      m_pointCount: number;
      m_points: b2ManifoldPoint[];
      m_type: number;

      // Constants
      e_circles: number;
      e_faceA: number;
      e_faceB: number;
    }
    export interface b2ManifoldPoint {
      m_id: b2ContactID;
      m_localPoint: b2Vec2;
      m_normalImpulse: number;
      m_tangentImpulse: number;

      new(): b2ManifoldPoint;
      Reset(): void;
      Set(m: b2ManifoldPoint): void;
    }
    export interface b2OBB {
      center: b2Vec2;
      extents: b2Vec2;
      R: b2Mat22;
    }
    export interface b2RayCastInput {
      maxFraction: number;
      p1: b2Vec2;
      p2: b2Vec2;

      new(p1?: b2Vec2, p2?: b2Vec2, maxFraction?: number): b2ManifoldPoint;
    }
    export interface b2RayCastOutput {
      fraction: number;
      normal: b2Vec2;
    }
    export interface b2Segment {
      p1: b2Vec2;
      p2: b2Vec2;

      Extend(aabb: b2AABB): void;
      ExtendBackward(aabb: b2AABB): void;
      ExtendForward(aabb: b2AABB): void;
      TestSegment(lambda: number[], normal: b2Vec2, segment: b2Segment, maxLambda: number): boolean;
    }
    export interface b2SimplexCache {
      count: number;
      indexA: b2Vec2[];
      indexB: b2Vec2[];
      metric: number;
    }
    export interface b2TOIInput {
      proxyA: b2DistanceProxy;
      proxyB: b2DistanceProxy;
      sweepA: b2Sweep;
      sweepB: b2Sweep;
      tolerance: number;
    }
    export interface b2WorldManifold {
      m_normal: b2Vec2;
      m_points: b2Vec2[];

      new(): b2WorldManifold;
      Initialize(manifold: b2Manifold, xfA: b2Transform, radiusA: number, xfB: b2Transform, radiusB: number): void;
    }
    export interface Features {
      flip: number;
      incidentEdge: number;
      incidentVertex: number;
      referenceEdge: number;
    }
  }
  export namespace Dynamics {
    export namespace Contacts {
      export interface b2Contact {
        new(): b2Contact;
        FlagForFiltering(): void;
        GetFixtureA(): b2Fixture;
        GetFixtureB(): b2Fixture;
        GetManifold(): Box2D.Collision.b2Manifold;
        GetNext(): b2Contact;
        GetWorldManifold(worldManifold: Box2D.Collision.b2WorldManifold): void;
        IsContinuous(): Boolean;
        IsEnabled(): Boolean;
        IsSensor(): Boolean;
        IsTouching(): Boolean;
        SetEnabled(flag: Boolean): void;
        SetSensor(sensor: Boolean): void;
      }
      export interface b2ContactEdge {
        contact: b2Contact;
        next: b2ContactEdge;
        other: b2Body;
        prev: b2ContactEdge;
      }
      export interface b2ContactResult {
        id: Box2D.Collision.b2ContactID;
        normal: Box2D.Common.Math.b2Vec2;
        normalImpulse: number;
        position: Box2D.Common.Math.b2Vec2;
        shape1: Box2D.Dynamics.b2Shape;
        shape2: Box2D.Dynamics.b2Shape;
        tangentImpulse: number;
      }
    }
    export namespace Joints {
      export interface b2Joint {
        GetAnchorA(): b2Vec2;
        GetAnchorB(): b2Vec2;
        GetBodyA(): b2Body;
        GetBodyB(): b2Body;
        GetNext(): b2Joint;
        GetReactionForce(inv_dt: number): b2Vec2;
        GetReactionTorque(inv_dt: number): number;
        GetType(): number;
        GetUserData(): any;
        IsActive(): boolean;
        SetUserData(data: any): void;
      }
      export interface b2DistanceJoint extends b2Joint {
        GetAnchorA(): b2Vec2;
        GetAnchorB(): b2Vec2;
        GetDampingRatio(): number;
        GetFrequency(): number;
        GetLength(): number;
        GetReactionForce(inv_dt: number): b2Vec2;
        GetReactionTorque(inv_dt: number): number;
        SetDampingRatio(ratio: number): void;
        SetFrequency(hz: number): void;
        SetLength(length: number): void;
      }
      export interface b2DistanceJointDef extends b2JointDef {
        dampingRatio: number
        frequencyHz: number
        length: number
        localAnchorA: b2Vec2
        localAnchorB: b2Vec2
      }
      export interface b2FrictionJoint extends b2Joint {
        m_angularMass: number
        m_linearMass: Box2D.Common.Math.b2Mat22
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetMaxForce(): number
        GetMaxTorque(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        SetMaxForce(force: number): void
        SetMaxTorque(torque: number): void
      }

      export interface b2FrictionJointDef extends b2JointDef {
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        maxForce: number
        maxTorque: number
        Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void
      }
      export interface b2GearJoint extends b2Joint {
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetRatio(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        SetRatio(ratio: number): void
      }
      export interface b2GearJointDef extends b2JointDef {
        joint1: b2Joint
        joint2: b2Joint
        ratio: number
      }
      export interface b2JointDef {
        bodyA: b2Body
        bodyB: b2Body
        collideConnected: boolean
        type: number
      }
      export interface b2JointEdge {
        joint: b2Joint
        next: b2JointEdge
        other: b2Body
        prev: b2JointEdge
      }
      export interface b2LineJoint {
        EnableLimit(flag: boolean): void
        EnableMotor(flag: boolean): void
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetJointSpeed(): number
        GetJointTranslation(): number
        GetLowerLimit(): number
        GetMaxMotorForce(): number
        GetMotorForce(): number
        GetMotorSpeed(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        GetUpperLimit(): number
        IsLimitEnabled(): boolean
        IsMotorEnabled(): boolean
        SetLimits(lower: number, upper: number): void
        SetMaxMotorForce(force: number): void
        SetMotorSpeed(speed: number): void
      }
      export interface b2LineJointDef {
        enableLimit: boolean
        enableMotor: boolean
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        localAxisA: Box2D.Common.Math.b2Vec2
        lowerTranslation: number
        maxMotorForce: number
        motorSpeed: number
        upperTranslation: number
        Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2, axis: Box2D.Common.Math.b2Vec2): void
      }
      export interface b2MouseJoint {
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetDampingRatio(): number
        GetFrequency(): number
        GetMaxForce(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        GetTarget(): Box2D.Common.Math.b2Vec2
        SetDampingRatio(ratio: number): void
        SetFrequency(hz: number): void
        SetMaxForce(maxForce: number): void
        SetTarget(target: Box2D.Common.Math.b2Vec2): void
      }
      export interface b2MouseJointDef {
        dampingRatio: number
        frequencyHz: number
        maxForce: number
        target: Box2D.Common.Math.b2Vec2
      }
      export interface b2PrismaticJoint {
        EnableLimit(flag: boolean): void
        EnableMotor(flag: boolean): void
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetJointSpeed(): number
        GetJointTranslation(): number
        GetLowerLimit(): number
        GetMotorForce(): number
        GetMotorSpeed(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        GetUpperLimit(): number
        IsLimitEnabled(): boolean
        IsMotorEnabled(): boolean
        SetLimits(lower: number, upper: number): void
        SetMaxMotorForce(force: number): void
        SetMotorSpeed(speed: number): void
      }
      export interface b2PrismaticJointDef {
        enableLimit: boolean
        enableMotor: boolean
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        localAxisA: Box2D.Common.Math.b2Vec2
        lowerTranslation: number
        maxMotorForce: number
        motorSpeed: number
        referenceAngle: number
        upperTranslation: number
        Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2, axis: Box2D.Common.Math.b2Vec2): void
      }
      export interface b2PulleyJoint {
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetGroundAnchorA(): Box2D.Common.Math.b2Vec2
        GetGroundAnchorB(): Box2D.Common.Math.b2Vec2
        GetLength1(): number
        GetLength2(): number
        GetRatio(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
      }
      export interface b2PulleyJointDef {
        groundAnchorA: Box2D.Common.Math.b2Vec2
        groundAnchorB: Box2D.Common.Math.b2Vec2
        lengthA: number
        lengthB: number
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        maxLengthA: number
        maxLengthB: number
        ratio: number
        Initialize(bA: b2Body, bB: b2Body, gaA: Box2D.Common.Math.b2Vec2, gaB: Box2D.Common.Math.b2Vec2, anchorA: Box2D.Common.Math.b2Vec2, anchorB: Box2D.Common.Math.b2Vec2, r: number): void
      }
      export interface b2RevoluteJoint {
        EnableLimit(flag: boolean): void
        EnableMotor(flag: boolean): void
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetJointAngle(): number
        GetJointSpeed(): number
        GetLowerLimit(): number
        GetMotorSpeed(): number
        GetMotorTorque(): number
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
        GetUpperLimit(): number
        IsLimitEnabled(): boolean
        IsMotorEnabled(): boolean
        SetLimits(lower: number, upper: number): void
        SetMaxMotorTorque(torque: number): void
        SetMotorSpeed(speed: number): void
      }
      export interface b2RevoluteJointDef {
        enableLimit: boolean
        enableMotor: boolean
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        lowerAngle: number
        maxMotorTorque: number
        motorSpeed: number
        referenceAngle: number
        upperAngle: number
        Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void
      }
      export interface b2WeldJoint {
        GetAnchorA(): Box2D.Common.Math.b2Vec2
        GetAnchorB(): Box2D.Common.Math.b2Vec2
        GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2
        GetReactionTorque(inv_dt: number): number
      }
      export interface b2WeldJointDef {
        localAnchorA: Box2D.Common.Math.b2Vec2
        localAnchorB: Box2D.Common.Math.b2Vec2
        referenceAngle: number
        Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void
      }

    }
    export namespace Controllers {
      export interface b2ControllerEdge {
        // Public properties
        body: b2Body;
        controller: b2Controller;
        nextBody: b2ControllerEdge;
        nextController: b2ControllerEdge;
        prevBody: b2ControllerEdge;
        prevController: b2ControllerEdge;
      }
      export interface b2Controller {
        // Protected properties
        m_bodyCount: number;
        m_bodyList: b2ControllerEdge;

        // Public methods
        AddBody(body: b2Body): void;
        Clear(): void;
        Draw(debugDraw: b2DebugDraw): void;
        GetBodyList(): b2ControllerEdge;
        GetNext(): b2Controller;
        GetWorld(): b2World;
        RemoveBody(body: b2Body): void;
        Step(step: b2TimeStep): void;
      }
      export interface b2BuoyancyController extends b2Controller {
        // Properties
        angularDrag: number;
        density: number;
        gravity: b2Vec2;
        linearDrag: number;
        normal: b2Vec2;
        offset: number;
        useDensity: boolean;
        useWorldGravity: boolean;
        velocity: b2Vec2;

        // Public methods
        Draw(debugDraw: b2DebugDraw): void;
        Step(step: b2TimeStep): void;
      }
      export interface b2ConstantAccelController extends b2Controller {
        // Public properties
        A: b2Vec2;

        // Public methods
        Step(step: b2TimeStep): void;
      }
      export interface b2ConstantForceController extends b2Controller {
        // Public properties
        F: b2Vec2;

        // Public methods
        Step(step: b2TimeStep): void;
      }
      export interface b2GravityController extends b2Controller {
        // Public properties
        G: number;
        invSqr: boolean;

        // Public methods
        Step(step: b2TimeStep): void;
      }
      export interface b2TensorDampingController extends b2Controller {
        // Public properties
        maxTimestep: number;
        T: b2Mat22;

        // Public methods
        SetAxisAligned(xDamping: number, yDamping: number): void;
        Step(step: b2TimeStep): void;
      }

    }
    export interface b2Body {
      b2_dynamicBody: number;
      b2_kinematicBody: number;
      b2_staticBody: number;
      gravityScale: b2Vec2;

      ApplyForce(force: b2Vec2, point: b2Vec2): void;
      ApplyImpulse(impulse: b2Vec2, point: b2Vec2): void;
      ApplyTorque(torque: number): void;
      CreateFixture(def: b2FixtureDef): b2Fixture;
      CreateFixture2(shape: b2Shape, density: number): b2Fixture;
      DestroyFixture(fixture: b2Fixture): void;
      GetAngle(): number;
      GetAngularDamping(): number;
      GetAngularVelocity(): number;
      GetContactList(): b2ContactEdge;
      GetControllerList(): b2ControllerEdge;
      GetDefinition(): b2BodyDef;
      GetFixtureList(): b2Fixture;
      GetInertia(): number;
      GetJointList(): b2JointEdge;
      GetLinearDamping(): number;
      GetLinearVelocity(): b2Vec2;
      GetLinearVelocityFromLocalPoint(localPoint: b2Vec2): b2Vec2;
      GetLinearVelocityFromWorldPoint(worldPoint: b2Vec2): b2Vec2;
      GetLocalCenter(): b2Vec2;
      GetLocalPoint(worldPoint: b2Vec2): b2Vec2;
      GetLocalVector(worldVector: b2Vec2): b2Vec2;
      GetMass(): number;
      GetMassData(data: b2MassData): void;
      GetNext(): b2Body;
      GetPosition(): b2Vec2;
      GetTransform(): b2Transform;
      GetType(): number;
      GetUserData(): any;
      GetWorld(): b2World;
      GetWorldCenter(): b2Vec2;
      GetWorldPoint(localPoint: b2Vec2): b2Vec2;
      GetWorldVector(localVector: b2Vec2): b2Vec2;
      IsActive(): boolean;
      IsAwake(): boolean;
      IsBullet(): boolean;
      IsFixedRotation(): boolean;
      IsSleepingAllowed(): boolean;
      Merge(other: b2Body): void;
      ResetMassData(): void;
      SetActive(flag: boolean): void;
      SetAngle(angle: number): void;
      SetAngularDamping(angularDamping: number): void;
      SetAngularVelocity(omega: number): void;
      SetAwake(flag: boolean): void;
      SetBullet(flag: boolean): void;
      SetFixedRotation(fixed: boolean): void;
      SetLinearDamping(linearDamping: number): void;
      SetLinearVelocity(v: b2Vec2): void;
      SetMassData(massData: b2MassData): void;
      SetPosition(position: b2Vec2): void;
      SetPositionAndAngle(position: b2Vec2, angle: number): void;
      SetSleepingAllowed(flag: boolean): void;
      SetTransform(xf: b2Transform): void;
      SetType(type: number): void;
      SetUserData(data: any): void;
      Split(callback: Function): b2Body;
    }
    export interface b2BodyDef {
      active: boolean;
      allowSleep: boolean;
      angle: number;
      angularDamping: number;
      angularVelocity: number;
      awake: boolean;
      bullet: boolean;
      fixedRotation: boolean;
      inertiaScale: number;
      linearDamping: number;
      linearVelocity: b2Vec2;
      position: b2Vec2;
      type: number;
      userData: any;

      new(): b2BodyDef;

    }
    export interface b2ContactFilter {
      RayCollide(userData: any, fixture: b2Fixture): boolean;
      ShouldCollide(fixtureA: b2Fixture, fixtureB: b2Fixture): boolean;
    }
    export interface b2ContactImpulse {
      normalImpulses: b2Vec2[];
      tangentImpulses: b2Vec2[];
    }
    export interface b2DestructionListener {
      SayGoodbyeFixture(fixture: b2Fixture): void;
      SayGoodbyeJoint(joint: b2Joint): void;
    }
    export interface b2FilterData {
      categoryBits: uint;
      groupIndex: int;
      maskBits: uint;

      Copy(): b2FilterData;
    }
    export interface b2Fixture {
      GetAABB(): b2AABB;
      GetBody(): b2Body;
      GetDensity(): Number;
      GetFilterData(): b2FilterData;
      GetFriction(): Number;
      GetMassData(massData?: b2MassData): b2MassData;
      GetNext(): b2Fixture;
      GetRestitution(): Number;
      GetShape(): b2Shape & Collision.Shapes.b2PolygonShape & Collision.Shapes.b2CircleShape;
      GetType(): int;
      GetUserData(): any;
      IsSensor(): Boolean;
      RayCast(output: b2RayCastOutput, input: b2RayCastInput): Boolean;
      SetDensity(density: Number): void;
      SetFilterData(filter: b2FilterData): void;
      SetFriction(friction: Number): void;
      SetRestitution(restitution: Number): void;
      SetSensor(sensor: Boolean): void;
      SetUserData(data: any): void;
      TestPoint(p: b2Vec2): Boolean;
    }
    export interface b2FixtureDef {
      density: Number;
      filter: b2FilterData;
      friction: Number;
      isSensor: Boolean;
      restitution: Number;
      shape: b2Shape;
      userData: any;
      new(): b2FixtureDef;
    }
    export interface b2World {
      new(gravity: b2Vec2, doSleep: Boolean): b2World;
      AddController(c: b2Controller): b2Controller;
      ClearForces(): void;
      CreateBody(def: b2BodyDef): b2Body;
      CreateController(controller: b2Controller): b2Controller;
      CreateJoint(def: b2JointDef): b2Joint;
      DestroyBody(b: b2Body): void;
      DestroyController(controller: b2Controller): void;
      DestroyJoint(j: b2Joint): void;
      DrawDebugData(): void;
      GetBodyCount(): int;
      GetBodyList(): b2Body;
      GetContactCount(): int;
      GetContactList(): b2Contact;
      GetGravity(): b2Vec2;
      GetGroundBody(): b2Body;
      GetJointCount(): int;
      GetJointList(): b2Joint;
      GetProxyCount(): int;
      IsLocked(): Boolean;
      QueryAABB(callback: Function, aabb: b2AABB): void;
      QueryPoint(callback: Function, p: b2Vec2): void;
      QueryShape(callback: Function, shape: b2Shape, transform: b2Transform | null): void;
      RayCast(callback: Function, point1: b2Vec2, point2: b2Vec2): void;
      RayCastAll(point1: b2Vec2, point2: b2Vec2): Vector;
      RayCastOne(point1: b2Vec2, point2: b2Vec2): b2Fixture;
      RemoveController(c: b2Controller): void;
      SetBroadPhase(broadPhase: IBroadPhase): void;
      SetContactFilter(filter: b2ContactFilter): void;
      SetContactListener(listener: b2ContactListener): void;
      SetContinuousPhysics(flag: Boolean): void;
      SetDebugDraw(debugDraw: b2DebugDraw): void;
      SetDestructionListener(listener: b2DestructionListener): void;
      SetGravity(gravity: b2Vec2): void;
      SetWarmStarting(flag: Boolean): void;
      Step(dt: Number, velocityIterations: int, positionIterations: int): void;
      Validate(): void;
      e_locked: int;
      e_newFixture: int;
      m_bodyList: any;
    }
  }
  export namespace Common {
    export namespace Math {
      export interface b2Vec2 {
        x: number;
        y: number;

        new(x_: number, y_: number): b2Vec2;

        Abs(): void;
        Add(v: b2Vec2): void;
        Copy(): b2Vec2;
        CrossFV(s: number): void;
        CrossVF(s: number): void;
        GetNegative(): b2Vec2;
        IsValid(): boolean;
        Length(): number;
        LengthSquared(): number;
        Make(x_: number, y_: number): b2Vec2;
        MaxV(b: b2Vec2): void;
        MinV(b: b2Vec2): void;
        MulM(A: b2Mat22): void;
        Multiply(a: number): void;
        MulTM(A: b2Mat22): void;
        NegativeSelf(): void;
        Normalize(): number;
        Set(x_: number, y_: number): void;
        SetV(v: b2Vec2): void;
        SetZero(): void;
        Subtract(v: b2Vec2): void;
      }
      export interface b2Vec3 {
        x: number;
        y: number;
        z: number;

        new(x?: number, y?: number, z?: number): void;

        Add(v: b2Vec3): void;
        Copy(): b2Vec3;
        GetNegative(): b2Vec3;
        Multiply(a: number): void;
        NegativeSelf(): void;
        Set(x: number, y: number, z: number): void;
        SetV(v: b2Vec3): void;
        SetZero(): void;
        Subtract(v: b2Vec3): void;
      }
      export interface b2Transform {
        position: b2Vec2;
        R: b2Mat22;

        new(pos?: b2Vec2, r?: b2Mat22): void;

        GetAngle(): number;
        Initialize(pos: b2Vec2, r: b2Mat22): void;
        Set(x: b2Transform): void;
        SetIdentity(): void;
      }
      export interface b2Sweep2 {
        a: number;
        a0: number;
        c: b2Vec2;
        c0: b2Vec2;
        localCenter: b2Vec2;
        t0: number;

        Advance(t: number): void;
        Copy(): b2Sweep2;
        GetTransform(xf: b2Transform, alpha: number): void;
        Set(other: b2Sweep2): void;
      }
      export interface b2Mat22 {
        col1: b2Vec2;
        col2: b2Vec2;

        new(): b2Mat22;

        Abs(): void;
        AddM(m: b2Mat22): void;
        Copy(): b2Mat22;
        GetAngle(): number;
        GetInverse(out: b2Mat22): b2Mat22;
        Set(angle: number): void;
        SetIdentity(): void;
        SetM(m: b2Mat22): void;
        SetVV(c1: b2Vec2, c2: b2Vec2): void;
        SetZero(): void;
        Solve(out: b2Vec2, bX: number, bY: number): b2Vec2;
      }
      export interface b2Mat33 {
        col1: b2Vec3;
        col2: b2Vec3;
        col3: b2Vec3;

        new(c1?: b2Vec3, c2?: b2Vec3, c3?: b2Vec3): void;

        AddM(m: b2Mat33): void;
        Copy(): b2Mat33;
        SetIdentity(): void;
        SetM(m: b2Mat33): void;
        SetVVV(c1: b2Vec3, c2: b2Vec3, c3: b2Vec3): void;
        SetZero(): void;
        Solve22(out: b2Vec2, bX: number, bY: number): b2Vec2;
        Solve33(out: b2Vec3, bX: number, bY: number, bZ: number): b2Vec3;
      }
    }
    export interface b2Color {
      r: number;
      g: number;
      b: number;

      new(rr: number, gg: number, bb: number): b2Color;
      Set(rr: number, gg: number, bb: number): void;
    }
    export interface b2Settings {
      b2_aabbExtension: number;
      b2_aabbMultiplier: number;
      b2_angularSleepTolerance: number;
      b2_angularSlop: number;
      b2_contactBaumgarte: number;
      b2_linearSleepTolerance: number;
      b2_linearSlop: number;
      b2_maxAngularCorrection: number;
      b2_maxLinearCorrection: number;
      b2_maxManifoldPoints: number;
      b2_maxRotation: number;
      b2_maxRotationSquared: number;
      b2_maxTOIContactsPerIsland: number;
      b2_maxTOIJointsPerIsland: number;
      b2_maxTranslation: number;
      b2_maxTranslationSquared: number;
      b2_pi: number;
      b2_polygonRadius: number;
      b2_timeToSleep: number;
      b2_toiSlop: number;
      b2_velocityThreshold: number;
      USHRT_MAX: number;
      VERSION: string;
    }
  }
}