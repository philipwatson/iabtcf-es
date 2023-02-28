import {PurposeRestriction} from './PurposeRestriction.js';
import {BinarySearchTree} from './BinarySearchTree.js';
import {RestrictionType} from './RestrictionType.js';
import {Cloneable} from '../Cloneable.js';

export class PurposeRestrictionVector extends Cloneable<PurposeRestrictionVector> {

  /**
   * if this originatd from an encoded string we'll need a place to store the
   * bit length; it can be set and got from here
   */
  public bitLength = 0;

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.
   *
   * Using a BST to keep vendors in a sorted order for encoding later
   */
  private map: Map<string, BinarySearchTree> = new Map<string, BinarySearchTree>();

  private has(hash: string): boolean {

    return this.map.has(hash);

  }

  private isOkToHave(restrictionType: RestrictionType, purposeId: number, vendorId: number): boolean {
    return true;
  }

  /**
   * add - adds a given Vendor ID under a given Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {void}
   */
  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    if (this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {

      const hash: string = purposeRestriction.hash;

      if (!this.has(hash)) {

        this.map.set(hash, new BinarySearchTree());
        this.bitLength = 0;

      }

      /**
       * Previously I had a check here to remove a duplicate value, but because
       * we're using a tree the value is guaranteed to be unique so there is no
       * need to add an additional de-duplication here.
       */

      this.map.get(hash).add(vendorId);

    }

  }


  /**
   * getVendors - returns array of vendor ids optionally narrowed by a given
   * Purpose Restriction.  If no purpose restriction is passed then all vendor
   * ids will be returned.  One can expect this result to be a unique set of
   * ids no duplicates.
   *
   * @param {PurposeRestriction} [purposeRestriction] - optionally passed to
   * get only Vendor IDs restricted under the given Purpose Restriction
   * @return {number[]} - Unique ID set of vendors
   */
  public getVendors(purposeRestriction?: PurposeRestriction): number[] {

    let vendorIds: number[] = [];

    if (purposeRestriction) {

      const hash: string = purposeRestriction.hash;

      if (this.has(hash)) {

        vendorIds = (this.map.get(hash) as BinarySearchTree).get();

      }

    } else {

      const vendorSet = new Set<number>();

      this.map.forEach((bst: BinarySearchTree): void => {

        bst.get().forEach((vendorId: number): void => {

          vendorSet.add(vendorId);

        });

      });

      vendorIds = Array.from(vendorSet);

    }

    return vendorIds;

  }

  public getRestrictionType(vendorId: number, purposeId: number): RestrictionType | undefined {

    let rType: RestrictionType;

    this.getRestrictions(vendorId).forEach((purposeRestriction: PurposeRestriction): void => {

      if (purposeRestriction.purposeId === purposeId) {

        if (rType === undefined || rType > purposeRestriction.restrictionType) {

          rType = purposeRestriction.restrictionType;

        }

      }

    });

    return rType;

  }

  /**
   * vendorHasRestriction - determines whether a given Vendor ID is under a
   * given Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {boolean} - true if the give Vendor ID is under the given Purpose
   * Restriction
   */
  public vendorHasRestriction(vendorId: number, purposeRestriction: PurposeRestriction): boolean {

    let has = false;
    const restrictions = this.getRestrictions(vendorId);

    for (let i = 0; i < restrictions.length && !has; i++) {

      has = purposeRestriction.isSameAs(restrictions[i]);

    }

    return has;

  }

  /**
   * getMaxVendorId - gets the Maximum Vendor ID regardless of Purpose
   * Restriction
   *
   * @return {number} - maximum Vendor ID
   */
  public getMaxVendorId(): number {

    let retr = 0;

    this.map.forEach((bst: BinarySearchTree): void => {

      retr = Math.max(bst.max(), retr);

    });

    return retr;

  }

  public getRestrictions(vendorId?: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      if (vendorId) {

        if (bst.contains(vendorId)) {

          retr.push(PurposeRestriction.unHash(hash));

        }

      } else {

        retr.push(PurposeRestriction.unHash(hash));

      }

    });

    return retr;

  }

  public getPurposes(): number[] {

    const purposeIds = new Set<number>();

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      purposeIds.add(PurposeRestriction.unHash(hash).purposeId);

    });

    return Array.from(purposeIds);

  }

  /**
   * remove - removes Vendor ID from a Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {void}
   */
  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = purposeRestriction.hash;
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    if (bst) {

      bst.remove(vendorId);

      // if it's empty let's delete the key so it doesn't show up empty
      if (bst.isEmpty()) {

        this.map.delete(hash);
        this.bitLength = 0;

      }

    }

  }

  /**
   * isEmpty - whether or not this vector has any restrictions in it
   *
   * @return {boolean}
   */
  public isEmpty(): boolean {

    return this.map.size === 0;

  };

  /**
   * numRestrictions - returns the number of Purpose Restrictions.
   *
   * @return {number}
   */
  public get numRestrictions(): number {

    return this.map.size;

  }

}
