import { u256 } from "as-bignum/assembly";
import { StorageSlot } from "./StorageSlot";

export class StorageValue<T> {
  public value: u256;
  public slot: StorageSlot;
  constructor(slot: StorageSlot) {
    this.slot = slot;
    this.value = u256.Zero;
  }
  static at<T>(slot: StorageSlot): StorageValue<T> {
    return new StorageValue<T>(slot);
  }
  save(): StorageValue<T> {
    this.slot.set(this.value);
    return this;
  }
  set(v: T): StorageValue<T> {
    this.value = v;
    this.save();
    return this;
  }
  load(): StorageValue<T> {
    this.value = this.slot.get();
    return this;
  }
  toTyped(): T {
    return changetype<T>(this.value);
  }
}
