/**
 * Represents an option to indicate whether at least one result should be present.
 *
 * @property shouldHaveAtLeastOneResult - If true, the consumer expects at least one result to be returned.
 *
 * @example
 * ```typescript
 * function fetchData(options: ShouldHaveAtLeastOneResult) {
 *   if (options.shouldHaveAtLeastOneResult) {
 *     // Ensure at least one result is returned
 *   }
 * }
 * ```
 */
export interface ShouldHaveAtLeastOneResult {
  /**
   * Indicates whether the parser should ensure at least one result is returned.
   * If true, the parser will return an error if no results are captured.
   */
  shouldHaveAtLeastOneResult?: boolean;
}
