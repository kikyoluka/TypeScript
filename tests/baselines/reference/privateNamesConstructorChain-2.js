//// [privateNamesConstructorChain-2.ts]
class Parent<T> {
    #foo = 3;
    static #bar = 5;
    accessChildProps() {
        new Child<string>().#foo; // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
        Child.#bar;       // Error: not found
    }
}

class Child<T> extends Parent<T> {
    #foo = "foo";       // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
    #bar = "bar";       // OK
}

new Parent<number>().accessChildProps();


//// [privateNamesConstructorChain-2.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo, _bar;
const Parent = /** @class */ (() => {
    var _foo_1, _bar;
    class Parent {
        constructor() {
            _foo_1.set(this, 3);
        }
        accessChildProps() {
            __classPrivateFieldGet(new Child(), _foo_1); // OK (`#foo` was added when `Parent`'s constructor was called on `child`)
            __classPrivateFieldGet(Child, _bar); // Error: not found
        }
    }
    _foo_1 = new WeakMap(), _bar = new WeakMap();
    _bar.set(Parent, 5);
    return Parent;
})();
class Child extends Parent {
    constructor() {
        super(...arguments);
        _foo.set(this, "foo"); // OK (Child's #foo does not conflict, as `Parent`'s `#foo` is not accessible)
        _bar.set(this, "bar"); // OK
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
new Parent().accessChildProps();
