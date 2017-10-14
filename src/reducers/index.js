const creepypastaStories = (state = [], action) => {

}

const testCreepypastaStories = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_STORIES',
		stories: ['testStory', 'testStory2']
	}
	const stateAfter = ['testStory', 'testStory2'];

	expect(
		creepypastaStories(stateBefore, action)
	).equals(stateAfter);
};

testCreepypastaStories();
console.log('creepypastaStories tests pass.')