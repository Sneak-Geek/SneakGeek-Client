import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AppText } from './Text';
import { Icon } from 'react-native-elements';
import { themes } from '@resources';
import Collapsible from 'react-native-collapsible';

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  content: {
    marginTop: 10,
  },
});

type Props = {
  title: string;
  content: string | number;
  emphasizeTitle?: boolean;
  renderCollapsibleIndicator?: boolean;
  onCollapsibleExpand?: () => void;
  renderCollapsibleContent?: () => JSX.Element;
};

export const TitleContentDescription = (props: Props): JSX.Element => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <TouchableWithoutFeedback
      onPress={(): void => {
        props.onCollapsibleExpand?.();
        setCollapsed(!collapsed);
      }}
    >
      <View>
        <View style={styles.rootContainer}>
          <View style={styles.sectionContainer}>
            <AppText.Subhead>
              {props.emphasizeTitle ? props.title.toUpperCase() : props.title}
            </AppText.Subhead>
            <AppText.Body style={styles.content}>{props.content}</AppText.Body>
          </View>
          {props.renderCollapsibleIndicator && (
            <Icon
              name={collapsed ? 'expand-less' : 'expand-more'}
              size={themes.IconSize}
            />
          )}
        </View>
        {props.renderCollapsibleIndicator && (
          <Collapsible collapsed={collapsed}>
            {props.renderCollapsibleContent?.()}
          </Collapsible>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
