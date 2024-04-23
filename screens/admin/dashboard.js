import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Stats from './Stats';
import { getStats } from '../../services/StatsService';
import { backgroundC } from '../ConfigTheme';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundC }}>
      <View style={styles.container}>
        {stats && (
          <View style={styles.stats}>
            <StatItem icon="users" label="Clients" value={stats.countUtilisateurs} />
            <StatItem icon="grid" label="Centres" value={stats.countCentres} />
            <StatItem icon="archive" label="Rendez-vous" value={stats.countRdv} />
            <StatItem icon="columns" label="Créneaux" value={stats.countCreneau} />
            <StatItem icon="list" label="Rendez-vous aujourd'hui" value={stats.countRdvAujourdhui} />
            <StatItem icon="list" label="Rendez-vous après aujourd'hui" value={stats.countRdvApresAujourdHui} />
            <StatItem icon="calendar" label="Date max Créneau" value={stats.dateMaxCreneau} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const StatItem = ({ icon, label, value }) => (
  <View style={styles.statsItem}>
    <FeatherIcon color="#8C6CAB" name={icon} size={14} />
    <Text style={styles.statsItemLabel}>{label}</Text>
    <Text style={styles.statsItemValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  /** Stats */
  stats: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  statsItemLabel: {
    marginLeft: 8,
    marginRight: 'auto',
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d',
  },
  statsItemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d',
  },
});
