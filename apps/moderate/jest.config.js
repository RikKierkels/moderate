module.exports = {
  name: 'moderate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/moderate',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
