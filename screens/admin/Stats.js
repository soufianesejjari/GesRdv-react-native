import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const items = [
  {
    label: 'Users',
    value: '428',
    delta: -63.8,
  },
  {
    label: 'New users',
    value: '243',
    delta: -62.1,
  },
  {
    label: 'Avg time',
    value: '2m 15s',
    delta: 18.2,
  },
];

export default function Stats() {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Stats</Text>

        <View style={styles.stats}>
          {items.map(({ label, value, delta }, index) => (
            <View
              key={index}
              style={[
                styles.statsItem,
                index === 0 && {
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                },
                index === items.length - 1 && {
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                },
              ]}>
              <Text style={styles.statsItemLabel}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>

              <View style={styles.statsItemDelta}>
                <FeatherIcon
                  color={delta < 0 ? '#FF3B2F' : '#35C759'}
                  name={delta < 0 ? 'chevron-down' : 'chevron-up'}
                  size={14} />

                <Text
                  style={[
                    styles.statsItemDeltaText,
                    { color: delta < 0 ? '#FF3B2F' : '#35C759' },
                  ]}>
                  {Math.abs(delta)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Stats */
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#f6e2f4',
  },
  statsItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#253045',
    marginBottom: 6,
  },
  statsItemValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#011634',
    marginBottom: 4,
  },
  statsItemDelta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsItemDeltaText: {
    fontSize: 12,
    fontWeight: '600',
  },
});