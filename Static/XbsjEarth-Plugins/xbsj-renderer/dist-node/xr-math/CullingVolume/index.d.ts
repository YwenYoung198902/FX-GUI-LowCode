import { Number12, Number16, Number4 } from "../Numbers";
export declare class CullingVolume {
    planes: Number4[];
    constructor(planes?: Number4[]);
    static fromProjectionMatrix(projectionMatrix: Number16, target?: CullingVolume): CullingVolume;
    /**
     * For plane masks (as used in {@link CullingVolume#computeVisibilityWithPlaneMask}), this special value
     * represents the case where the object bounding volume is entirely outside the culling volume.
     *
     * @type {Number}
     * @private
     */
    static MASK_OUTSIDE: number;
    /**
     * For plane masks (as used in {@link CullingVolume.prototype.computeVisibilityWithPlaneMask}), this value
     * represents the case where the object bounding volume is entirely inside the culling volume.
     *
     * @type {Number}
     * @private
     */
    static MASK_INSIDE: number;
    /**
     * For plane masks (as used in {@link CullingVolume.prototype.computeVisibilityWithPlaneMask}), this value
     * represents the case where the object bounding volume (may) intersect all planes of the culling volume.
     *
     * @type {Number}
     * @private
     */
    static MASK_INDETERMINATE: number;
    /**
     * Determines whether a bounding volume intersects the culling volume.
     *
     * @param {Object} boundingVolume The bounding volume whose intersection with the culling volume is to be tested.
     * @param {Number} parentPlaneMask A bit mask from the boundingVolume's parent's check against the same culling
     *                                 volume, such that if (planeMask & (1 << planeIndex) === 0), for k < 31, then
     *                                 the parent (and therefore this) volume is completely inside plane[planeIndex]
     *                                 and that plane check can be skipped.
     * @returns {Number} A plane mask as described above (which can be applied to this boundingVolume's children).
     *
     * @private
     */
    computeVisibilityWithPlaneMask(boundingVolumeType: 'box', boundingVolume: Number12, parentPlaneMask: number): number;
    computeVisibilityWithPlaneMask(boundingVolumeType: 'sphere', boundingVolume: Number4, parentPlaneMask: number): number;
    transform(matrix: Readonly<Number16>): void;
}
export default CullingVolume;
