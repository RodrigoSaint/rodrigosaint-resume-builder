import React from "react";
import { List, Icon } from "semantic-ui-react";

const DeletionList = props => (
  <List>
    {props.collection.map(item => (
      <List.Item>
        <Icon
          link
          color="red"
          name="times"
          onClick={() => props.remove(item)}
        />
        {item}
      </List.Item>
    ))}
  </List>
);

export default DeletionList;
