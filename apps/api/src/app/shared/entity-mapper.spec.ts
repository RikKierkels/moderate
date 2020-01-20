import { IdeaEntity } from '../database/database-entities';
import EntityMapper from './entity-mapper';

const createAndUpdateDate = new Date(2020, 1, 1, 0, 0, 0, 0);

describe('Entity Mapper', () => {
  describe('While mapping an idea entity to a DTO', () => {
    let ideaEntity: IdeaEntity;

    beforeEach(() => {
      ideaEntity = {
        id: '1',
        title: 'Idea about to be mapped',
        description: 'Idea about to be mapped',
        difficulty: 5,
        author: {
          id: 'github123',
          username: 'Herman',
          picture: 'www.herman.com/face.jpg',
          ideas: [],
          messages: []
        },
        tags: [{ id: '1', name: 'Tag about to be mapped', color: '#000000' }],
        messages: [
          {
            id: '1',
            text: 'Message about to be mapped',
            author: {
              id: 'github234',
              username: 'Hans',
              picture: 'www.hans.com/face.jpg',
              ideas: [],
              messages: []
            },
            createdAt: createAndUpdateDate,
            updatedAt: createAndUpdateDate,
            isDeleted: false,
            idea: null
          },
          {
            id: '2',
            text: 'Message about to be mapped',
            author: {
              id: 'github345',
              username: 'Frans',
              picture: 'www.frans.com/face.jpg',
              ideas: [],
              messages: []
            },
            createdAt: createAndUpdateDate,
            updatedAt: createAndUpdateDate,
            isDeleted: true,
            idea: null
          }
        ],
        createdAt: createAndUpdateDate,
        updatedAt: createAndUpdateDate,
        isDeleted: false
      };
    });

    it('should map to an idea DTO', () => {
      const ideaDto = EntityMapper.mapToIdeaDto(ideaEntity);

      expect(ideaDto).toEqual({
        id: '1',
        title: 'Idea about to be mapped',
        description: 'Idea about to be mapped',
        difficulty: 5,
        author: {
          id: 'github123',
          username: 'Herman',
          picture: 'www.herman.com/face.jpg'
        },
        tags: [{ id: '1', name: 'Tag about to be mapped', color: '#000000' }],
        messageCount: 2,
        createdAt: createAndUpdateDate
      });
    });

    it('should map to a idea with messages DTO', () => {
      const ideaDto = EntityMapper.mapToIdeaWithMessagesDto(ideaEntity);

      expect(ideaDto).toEqual({
        id: '1',
        title: 'Idea about to be mapped',
        description: 'Idea about to be mapped',
        difficulty: 5,
        author: {
          id: 'github123',
          username: 'Herman',
          picture: 'www.herman.com/face.jpg'
        },
        tags: [{ id: '1', name: 'Tag about to be mapped', color: '#000000' }],
        messages: [
          {
            id: '1',
            text: 'Message about to be mapped',
            author: {
              id: 'github234',
              username: 'Hans',
              picture: 'www.hans.com/face.jpg'
            },
            createdAt: createAndUpdateDate
          },
          {
            id: '2',
            text: 'This message was deleted by the user.',
            author: {
              id: 'github345',
              username: 'Frans',
              picture: 'www.frans.com/face.jpg'
            },
            createdAt: createAndUpdateDate
          }
        ],
        createdAt: createAndUpdateDate
      });
    });
  });
});
