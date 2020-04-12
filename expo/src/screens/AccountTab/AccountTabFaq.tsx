import React from 'react';
import { getService } from 'utilities';
import { ISettingsProvider, FactoryKeys, SettingsKey } from 'business/src';
import {
  SafeAreaView,
  View,
  SectionList,
} from 'react-native';
import { AppText } from '@screens/Shared';
import { themes } from '@resources';

type FAQ = Array<{
  category: string;
  info: Array<{
    question: string;
    answer: string;
  }>;
}>;

export const AccountTabFaq = (): JSX.Element => {
  const settings = getService<ISettingsProvider>(FactoryKeys.ISettingsProvider);
  const faq: FAQ = settings.getValue(SettingsKey.RemoteSettings).faq;
  const sectionalFaq = faq.map(t => ({
    title: t.category,
    data: t.info,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SectionList
          sections={sectionalFaq}
          keyExtractor={(item, index): string => index.toString()}
          renderSectionHeader={({ section }): JSX.Element => (
            <View
              style={{
                backgroundColor: 'white',
                borderBottomColor: themes.AppDisabledColor,
                borderBottomWidth: 0.5,
              }}
            >
              <AppText.Title1 style={{ marginVertical: 8, marginLeft: 10, color: themes.AppPrimaryColor }}>
                {section.title}
              </AppText.Title1>
            </View>
          )}
          renderItem={({ item }): JSX.Element => (
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <AppText.Title2>{item.question}</AppText.Title2>
              <AppText.Body style={{ marginTop: 10 }}>{item.answer}</AppText.Body>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
