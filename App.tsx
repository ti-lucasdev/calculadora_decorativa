import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { calculatePrice, emptyInputs, PricingInputs, sanitizeNumber } from './src/pricing';

const currency = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL',
}).format(value);

const materialFields: { key: keyof PricingInputs; label: string; unit: string }[] = [
  { key: 'glassPrice', label: 'Vidro', unit: 'R$/m²' },
  { key: 'backingPrice', label: 'Fundo', unit: 'R$/m²' },
  { key: 'matPrice', label: 'Paspatur', unit: 'R$/m²' },
  { key: 'fabricPrice', label: 'Tecido', unit: 'R$/m²' },
  { key: 'printPrice', label: 'Impressão', unit: 'R$/m²' },
];

export default function App() {
  const [inputs, setInputs] = useState<PricingInputs>({ ...emptyInputs });
  const result = calculatePrice(inputs);

  function field(key: keyof PricingInputs, label: string, unit: string) {
    return (
      <View key={key} style={styles.field}>
        <Text style={styles.label}>{label} ({unit})</Text>
        <TextInput
          accessibilityLabel={`${label} em ${unit}`}
          keyboardType={key === 'quantity' ? 'number-pad' : 'decimal-pad'}
          value={inputs[key]}
          onChangeText={(value) => setInputs(current => ({
            ...current,
            [key]: key === 'quantity' ? value.replace(/\D/g, '') : sanitizeNumber(value),
          }))}
          style={styles.input}
          selectTextOnFocus
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image
              source={require('./assets/brand-header.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Molduras Decorativas"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Medidas</Text>
            {field('width', 'Largura', 'cm')}
            {field('height', 'Altura', 'cm')}
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Moldura</Text>
            {field('loss', 'Perda adicional', 'cm')}
            {field('framePrice', 'Preço da moldura por metro', 'R$/m')}
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Materiais por metro quadrado</Text>
            {materialFields.map(({ key, label, unit }) => field(key, label, unit))}
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Adicionais</Text>
            {field('service', 'Serviço', 'R$')}
            {field('percentage', 'Acréscimo sobre o subtotal', '%')}
            {field('quantity', 'Quantidade de produtos', 'unidades')}
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Resultado</Text>
            <ResultRow label="Moldura" value={result.items.frame} />
            <ResultRow label="Vidro" value={result.items.glass} />
            <ResultRow label="Fundo" value={result.items.backing} />
            <ResultRow label="Paspatur" value={result.items.mat} />
            <ResultRow label="Tecido" value={result.items.fabric} />
            <ResultRow label="Impressão" value={result.items.print} />
            <ResultRow label="Serviço" value={result.items.service} />
            <View style={styles.divider} />
            <ResultRow label="Subtotal" value={result.subtotal} />
            <ResultRow label="Acréscimo percentual" value={result.surcharge} />
            <View style={styles.divider} />
            {result.quantity > 1 && <ResultRow label="Preço unitário" value={result.unitTotal} />}
            <ResultRow
              label={result.quantity > 1 ? `Preço final (${result.quantity} produtos)` : 'Preço final'}
              value={result.total}
              total
            />
          </View>

          <Pressable accessibilityRole="button" onPress={() => setInputs({ ...emptyInputs })} style={styles.clear}>
            <Text style={styles.clearText}>Limpar todos os campos</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ResultRow({ label, value, total = false }: { label: string; value: number; total?: boolean }) {
  return (
    <View style={styles.resultRow}>
      <Text style={[styles.resultText, total && styles.total]}>{label}</Text>
      <Text style={[styles.resultText, styles.resultValue, total && styles.total]}>{currency(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#000' },
  content: { width: '100%', maxWidth: 520, alignSelf: 'center', padding: 20, paddingTop: 32, paddingBottom: 48, gap: 16 },
  header: { width: '100%', height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logo: { width: '100%', maxWidth: 360, height: '100%' },
  card: { backgroundColor: '#191919', padding: 18, borderRadius: 14, gap: 12 },
  heading: { color: '#EE2040', fontSize: 18, fontWeight: '700' },
  field: { gap: 6 },
  label: { color: '#eee', fontSize: 14 },
  input: { backgroundColor: '#292929', borderColor: '#464646', borderWidth: 1, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, minHeight: 48, color: '#fff', fontSize: 18 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' },
  resultText: { color: '#ddd', fontSize: 15 },
  resultValue: { fontWeight: '700' },
  total: { color: '#EE2040', fontSize: 20, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#383838' },
  clear: { alignItems: 'center', padding: 16 },
  clearText: { color: '#EE2040', fontSize: 15, fontWeight: '700' },
});
