import { Exercise } from './exercise';

xdescribe('Exercise', () => {
  it('should create an instance', () => {
    expect(new Exercise('','','',0)).toBeTruthy();
  });
});
