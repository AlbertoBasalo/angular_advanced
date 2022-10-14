A review of the Angular Injection syntax.
Having an Injectable class is the very first starting point

Could be the default root scoped

[...]

Or not scoped at all

And therefore, needs to be provided at some point

[...]
Module level

[...]
Component level

[...]
From now on, you can ask for the dependency by declaring it as a constructor parameter

[...]
You must decorate the parameter with Inject(Token) only in case the service is not class-based. Otherwise, it's redundant (like in this example)

[...]
Alternatively, you can use the Inject function to recall a dependency without polluting the constructor. But you can only use this function at the constructor level or a during property declaration.

[...]
Furthermore, you can use the static Injector class.

[...]
The Injector class can even configure the provision mechanics before instantiating

[...]
So, as you can see, there are plenty of options to inject and be injected
