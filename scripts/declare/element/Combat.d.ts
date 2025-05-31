declare type BulletHitType = 'head' | 'body' | 'legs';
declare type DistanceType = 'near' | 'medium' | 'far';

declare interface DamageType {
    head: number;
    body: number;
    legs: number;
}

declare type FireModeType = 'fully-auto' | 'semi-auto'