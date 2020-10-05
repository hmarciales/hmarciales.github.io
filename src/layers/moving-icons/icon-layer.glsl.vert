#define SHADER_NAME icon-layer-vertex-shader

attribute vec2 positions;

attribute float instanceSizes;
attribute vec4 instanceColors;
attribute vec3 instancePickingColors;
attribute vec4 instanceIconFrames;
attribute float instanceColorModes;
attribute vec2 instanceOffsets;
attribute vec2 instancePixelOffset;

uniform float sizeScale;
uniform vec2 iconsTextureDim;
uniform float sizeMinPixels;
uniform float sizeMaxPixels;
uniform bool billboard;

uniform float currentTime;

uniform vec2 iconStillOffsets;
uniform float iconStillColorModes;
uniform vec4 iconStillFrames;

attribute float instanceTimestamps;
attribute float instanceTimestampsNext;
attribute vec2 instanceStartPositions;
attribute vec2 instanceEndPositions;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;
varying vec2 uv;
varying float vPercentComplete;

vec2 rotate_by_angle(vec2 vertex, float angle_radian) {
  // float angle_radian = angle * PI / 180.0;
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return rotationMatrix * vertex;
}

vec3 interpolate(in vec3 point1, in vec3 point2, in float timestepFraction) {
    if (timestepFraction <= 0.0) {
        return point1;
    } else if (timestepFraction >= 1.0 ) {
        return point2;
    } else {
        vec3 direction = point2 - point1;
        return point1 + (direction * timestepFraction);
    }
}

void main(void) {

  // Calculate progress
  // (skip everything else if this vertex is outside the time window)

  if (currentTime < instanceTimestamps) {
    vPercentComplete = -1.0;
    return;

  } else if (currentTime > instanceTimestampsNext) {
    vPercentComplete = -1.0;
    return;

  } else {
    vPercentComplete = (currentTime - instanceTimestamps) /
                       (instanceTimestampsNext - instanceTimestamps);
  }

  geometry.pickingColor = instancePickingColors;

  vec3 startPosition = vec3(instanceStartPositions, 5.0);
  vec3 endPosition = vec3(instanceEndPositions, 5.0);

  // are we stationary/still
  bool still = (instanceStartPositions == instanceEndPositions);

  vec2 iconSize = still ? iconStillFrames.zw : instanceIconFrames.zw;
  // convert size in meters to pixels, then scaled and clamp
  // project meters to pixels and clamp to limits
  float sizePixels = clamp(
    project_size_to_pixel(instanceSizes * sizeScale),
    sizeMinPixels, sizeMaxPixels
  );

  // scale icon height to match instanceSize
  float instanceScale = iconSize.y == 0.0 ? 0.0 : sizePixels / iconSize.y;

  // figure out angle
  float angle = 0.0;
  if (!still) {
    vec3 point1 = project_position_to_clipspace(startPosition, vec3(0.0), vec3(0.0)).xyz;
    vec3 point2 = project_position_to_clipspace(endPosition, vec3(0.0), vec3(0.0)).xyz;
    vec3 direction = normalize(point2 - point1);
    angle = atan( direction.y / direction.x);
    if (direction.x < 0.0) angle = angle - PI;
  }

  // scale and rotate vertex in "pixel" value and convert back to fraction in clipspace
  vec2 pixelOffset = positions / 2.0 * iconSize + (still ? iconStillOffsets : instanceOffsets);
  pixelOffset = rotate_by_angle(pixelOffset, angle) * instanceScale;
  pixelOffset += instancePixelOffset;
  pixelOffset.y *= -1.0;

  vec3 newPosition = interpolate(
    startPosition,
    endPosition,
    vPercentComplete);

  if (billboard)  {
    gl_Position = project_position_to_clipspace(newPosition, vec3(0.0), vec3(0.0));
    vec3 offset = vec3(pixelOffset, 0.0);
    DECKGL_FILTER_SIZE(offset, geometry);
    gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);

  } else {
    vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
    DECKGL_FILTER_SIZE(offset_common, geometry);
    gl_Position = project_position_to_clipspace(newPosition, offset_common, vec3(0.0));
  }

  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vec2 upperleft = (still ? iconStillFrames.xy : instanceIconFrames.xy);

  vTextureCoords = mix(
    upperleft,
    upperleft + iconSize,
    (positions.xy + 1.0) / 2.0
  ) / iconsTextureDim;

  vColor = instanceColors;
  DECKGL_FILTER_COLOR(vColor, geometry);

  vColorMode = (still ? iconStillColorModes : instanceColorModes);
}
