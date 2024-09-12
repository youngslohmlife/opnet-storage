import { u256 } from "as-bignum/assembly";
import { StorageSlot } from "./StorageSlot";

export class StorageValue<T> {
  public inner: u256;
  public slot: StorageSlot;
  constructor(slot: StorageSlot) {
    this.slot = slot;
    this.inner = u256.Zero;
  }
  static at<T>(slot: StorageSlot): StorageValue<T> {
    return new StorageValue<T>(slot);
  }
  save(): StorageValue<T> {
    this.slot.set(u256.from(this.inner));
    return this;
  }
  set(v: T): StorageValue<T> {
    this.inner = u256.from(v);
    this.save();
    return this;
  }
  load(): StorageValue<T> {
    this.inner = this.slot.get();
    return this;
  }
  unwrap(): T {
    return load<T>(changetype<usize>(this.inner.toBytesLE().buffer));
  }
}
