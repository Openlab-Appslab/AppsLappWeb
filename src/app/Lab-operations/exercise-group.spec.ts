import { ExerciseGroup } from './exercise-group';

xdescribe('ExerciseGroup', () => {
  it('should create an instance', () => {
    expect(new ExerciseGroup('', [])).toBeTruthy();
  });
});
