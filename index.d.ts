declare namespace jest {
  interface Matchers<R> {
    /**
     * Checks that an array is sorted according to the passed options
     */
    toBeSorted(options?: {
      descending?: boolean;
      key?: string;
      coerce?: boolean;
      strict?: boolean;
      compare?: (a?: any, b?: any) => number;
    }): any;
    /**
     * Checks that an array of objects is sorted according to the passed key and options
     */
    toBeSortedBy(
      key: string,
      options?: {
        descending?: boolean;
        coerce?: boolean;
        strict?: boolean;
        compare?: (a?: any, b?: any) => number;
      }
    ): any;
  }

  interface Expect {
    /**
     * Checks that an array is sorted according to the passed options
     */
    toBeSorted(options?: {
      descending?: boolean;
      key?: string;
      coerce?: boolean;
      strict?: boolean;
      compare?: (a?: any, b?: any) => number;
    }): any;
    /**
     * Checks that an array of objects is sorted according to the passed key and options
     */
    toBeSortedBy(
      key: string,
      options?: {
        descending?: boolean;
        coerce?: boolean;
        strict?: boolean;
        compare?: (a?: any, b?: any) => number;
      }
    ): any;
  }
}
