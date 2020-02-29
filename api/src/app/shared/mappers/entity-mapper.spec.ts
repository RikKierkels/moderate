import { makeMessage } from '../test-helpers/make-entities.test-utils';
import EntityMapper from './entity-mapper';
import { UserEntity } from '../../database/entities/user.entity';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { TagEntity } from '../../database/entities/tag.entity';
import { MessageEntity } from '../../database/entities/message.entity';

const tagEntity: TagEntity = {
  id: '46518359-049f-49aa-8b4b-e41218674c1e',
  name: 'Angular',
  color: '#000'
};

const userEntity: UserEntity = {
  id: '46518359-049f-49aa-8b4b-e41218674c1e',
  username: 'RikKierkels',
  picture: 'https://www.cool-face.com/123.jpg',
  messages: [],
  ideas: []
};

const messageEntity: MessageEntity = {
  id: '46518359-049f-49aa-8b4b-e41218674c1e',
  text: 'I should map to a DTO',
  createdAt: new Date(2020, 1, 20),
  updatedAt: new Date(2020, 1, 20),
  isDeleted: false,
  author: userEntity,
  idea: null
};

const idea: IdeaEntity = {
  id: '46518359-049f-49aa-8b4b-e41218674c1e',
  title: 'Snapshot Test',
  description: 'I should map to a DTO',
  difficulty: 1,
  createdAt: new Date(2020, 1, 20),
  updatedAt: new Date(2020, 1, 20),
  isDeleted: false,
  author: userEntity,
  messages: [messageEntity, messageEntity],
  tags: [tagEntity]
};

describe('Entity Mapper', () => {
  it('should map a tag entity to a tag DTO', () => {
    const tagDto = EntityMapper.mapToTagDto(tagEntity);

    expect(tagDto).toMatchSnapshot();
  });

  it('should map a user entity to a user DTO', () => {
    const userDto = EntityMapper.mapToUserDto(userEntity);

    expect(userDto).toMatchSnapshot();
  });

  describe('While mapping a message entity to a DTO', () => {
    it('should map the message', () => {
      const messageDto = EntityMapper.mapToMessageDto(messageEntity);

      expect(messageDto).toMatchSnapshot();
    });

    it("should change the text if it's deleted", () => {
      let message = makeMessage();
      message = { ...message, isDeleted: true };

      const messageDto = EntityMapper.mapToMessageDto(message);

      expect(messageDto.text).toBe('This message was deleted by the user.');
    });
  });

  it('should map an idea entity to an idea DTO', () => {
    const ideaDto = EntityMapper.mapToIdeaDto(idea);

    expect(ideaDto).toMatchSnapshot();
  });

  it('should map an idea entity to an idea with messages DTO', () => {
    const ideaDto = EntityMapper.mapToIdeaWithMessagesDto(idea);

    expect(ideaDto).toMatchSnapshot();
  });
});
