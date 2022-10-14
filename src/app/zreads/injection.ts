import { Component, Injectable, NgModule } from "@angular/core";

// @Injectable({
//   providedIn: "root",
// })
// class MyService {
//   doSomething() {
//     console.log("doing something");
//   }
// }

@Injectable()
class MyService {
  doSomething() {
    console.log("doing something");
  }
}

@Component({})
class MyComponent {
  constructor(private myService: MyService) {}
  onclick() {
    this.myService.doSomething();
  }
}

@NgModule({
  declarations: [MyComponent],
  providers: [MyService],
})
class MyModule {}

const m = new MyModule();

// @Component({
//   providers: [MyService],
// })
// class MyComponent {
//   constructor(
//     @Inject(MyService) private myService: MyService) { }
//   onclick() {
//     this.myService.doSomething();
//   }
// }

// class MyComponent {
//   private myService: MyService;
//   constructor() {
//     this.myService = inject(MyService);
//   }
//   onclick() {
//     this.myService.doSomething();
//   }
// }

// class MyComponent {
//   private myService: MyService = inject(MyService);
//   onclick() {
//     this.myService.doSomething();
//   }
// }

// class MyComponent {
//   private myService: MyService;
//   constructor(injector: Injector) {
//     this.myService = injector.get(MyService);
//   }
//   onclick() {
//     this.myService.doSomething();
//   }
// }

// class MyComponent {
//   private myService: MyService;
//   constructor() {
//     const injector = Injector.create({
//       providers: [{ provide: MyService, useClass: MyService }],
//     });
//     this.myService = injector.get(MyService);
//   }
//   onclick() {
//     this.myService.doSomething();
//   }
// }

// const sr = new MyRootService();
// const c1 = new MyComponent1(new MyService());
// const c2 = new MyComponent2(new MyService());
// const c3 = new MyComponent3();
// const c4 = new MyComponent4();
// const c5 = new MyComponent5(new Injector([]));
// const c6 = new MyComponent6();
