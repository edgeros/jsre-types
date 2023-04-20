declare module 'edgeros:vehicle/camera' {
  import Camera = require('vehicle/camera');
  export = Camera;
}

declare module 'vehicle/camera' {
  class Camera {}

  export = Camera;
}
