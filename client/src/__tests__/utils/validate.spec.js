import validate, { validateField } from '../../utils/validate';

describe.only('utils/validate', () => {
  describe.only('#validate', () => {

  });

  describe.only('#validateField', () => {
    const field = 'field1';

    describe.only('required', () => {

      describe.only('when required is true', () => {
        const rules = { required: true };

        describe.only('and field is present', () => {
          test('it returns null', () => {
            const model = { field1: 'wow' };

            const result = validateField(model, field, rules);

            expect(result).toBeNull();
          });
        });

        describe.only('and field is null', () => {
          test('it returns the error object', () => {
            const model = { field1: null };

            const result = validateField(model, field, rules);

            expect(result.field).toBe('field1');
            expect(result.message).toBe('Field cannot be blank');
          });
        });

        describe.only('and field is an empty string', () => {
          test('it returns the error object', () => {
            const model = { field1: '' };

            const result = validateField(model, field, rules);

            expect(result.field).toBe('field1');
            expect(result.message).toBe('Field cannot be blank');
          });
        });
      });

      describe.only('when required is false', () => {
        const rules = { required: false }

        describe.only('and field is empty', () => {
          test('it returns null', () => {
            const model = { field1: null };

            const result = validateField(model, field, rules);

            expect(result).toBeNull();
          });
        });
      });
    });

    describe.only('minLength', () => {
      const rules = { minLength: 6 };

      describe.only('when length is more than minLength value', () => {
        test('it returns null', () => {
          const model = { field1: 'ohheywowthere' };

          const result = validateField(model, field, rules);

          expect(result).toBeNull();
        })
      });

      describe.only('when length is less than minLength value', () => {
        test('it returns the error object', () => {
          const model = { field1: 'oh' };

          const result = validateField(model, field, rules);

          expect(result.field).toBe('field1');
          expect(result.message).toBe('Field cannot be less than 6 characters');
        });
      });

      describe.only('when field is null', () => {
        test('it returns the error object', () => {
          const model = { field1: null };

          const result = validateField(model, field, rules);

          expect(result.field).toBe('field1');
          expect(result.message).toBe('Field cannot be less than 6 characters');
        });
      });
    });

    describe.only('maxLength', () => {
      const rules = { maxLength: 10 };

      describe.only('when length is less than maxLength value', () => {
        test('it returns null', () => {
          const model = { field1: 'ohheywow' };

          const result = validateField(model, field, rules);

          expect(result).toBeNull();
        })
      });

      describe.only('when length is more than maxLength value', () => {
        test('it returns the error object', () => {
          const model = { field1: 'ohheywowthere' };

          const result = validateField(model, field, rules);

          expect(result.field).toBe('field1');
          expect(result.message).toBe('Field cannot be more than 10 characters');
        });
      });

      describe.only('when field is null', () => {
        test('it returns null', () => {
          const model = { field1: null };

          const result = validateField(model, field, rules);

          expect(result).toBeNull();
        });
      });
    });

    describe.only('matchField', () => {
      describe.only('when fields match', () => {
        test('it returns null', () => {
          const model = { field1: 'wow', field2: 'wow' };
          const field = 'field2';
          const rules = { matchField: 'field1' };

          const result = validateField(model, field, rules);

          expect(result).toBeNull();
        });
      });

      describe.only('when fields do not match', () => {
        test('it returns null', () => {
          const model = { field1: 'wow', field2: 'oh hey' };
          const field = 'field1';
          const rules = { matchField: 'field2' };

          const result = validateField(model, field, rules);

          expect(result.field).toBe('field1');
          expect(result.message).toBe('Field must match field2');
        });
      });
    });
  });
});