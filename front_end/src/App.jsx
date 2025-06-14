/**
 * TechStore - Página de Vendas com Integração de IA
 * 
 * Este é o componente principal da aplicação TechStore, uma página de vendas moderna
 * e responsiva que integra um agente de IA conversacional para auxiliar os clientes.
 * 
 * Características principais:
 * - Design responsivo e moderno
 * - Integração com chatbot de IA
 * - Catálogo de produtos interativo
 * - Animações fluidas com Framer Motion
 * - Interface otimizada para conversão
 * 
 * Tecnologias utilizadas:
 * - React 18 com hooks
 * - Tailwind CSS para estilização
 * - Shadcn/UI para componentes
 * - Lucide React para ícones
 * - Framer Motion para animações
 * - Axios para requisições HTTP
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  MessageSquare, 
  Send, 
  X, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star,
  Truck,
  Shield,
  Zap,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Gamepad2,
  ChevronRight,
  Menu,
  Search,
  User,
  Filter,
  Grid,
  List,
  ArrowUp,
  CheckCircle,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import './App.css';

/**
 * Dados dos produtos - Em uma aplicação real, estes dados viriam de uma API
 * Cada produto contém informações detalhadas para exibição e filtragem
 */
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "smartphones",
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    description: "O mais avançado iPhone com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6.7 polegadas.",
    features: ["Chip A17 Pro", "Câmera 48MP", "Tela 6.7\"", "5G", "Face ID"],
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "laptops",
    price: 12999,
    originalPrice: 14999,
    discount: 13,
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    description: "MacBook Pro com chip M3, tela Liquid Retina XDR de 14 polegadas e até 22 horas de bateria.",
    features: ["Chip M3", "Tela 14\"", "32GB RAM", "1TB SSD", "Touch Bar"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 3,
    name: "AirPods Pro 2ª Geração",
    category: "headphones",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    rating: 4.7,
    reviews: 5642,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
    description: "AirPods Pro com cancelamento ativo de ruído, áudio espacial e até 6 horas de reprodução.",
    features: ["Cancelamento de Ruído", "Áudio Espacial", "6h Bateria", "Resistente à Água", "Siri"],
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 4,
    name: "Canon EOS R5",
    category: "cameras",
    price: 18999,
    originalPrice: 21999,
    discount: 14,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    description: "Câmera mirrorless full-frame com sensor de 45MP, vídeo 8K e estabilização de imagem.",
    features: ["Sensor 45MP", "Vídeo 8K", "Estabilização", "Wi-Fi", "Touchscreen"],
    inStock: false,
    isNew: false,
    isBestseller: false
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    category: "watches",
    price: 3299,
    originalPrice: 3799,
    discount: 13,
    rating: 4.6,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    description: "Apple Watch com chip S9, tela Always-On Retina e monitoramento avançado de saúde.",
    features: ["Chip S9", "Always-On", "GPS", "Saúde", "Siri"],
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 6,
    name: "PlayStation 5",
    category: "gaming",
    price: 4199,
    originalPrice: 4699,
    discount: 11,
    rating: 4.8,
    reviews: 7834,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    description: "Console de nova geração com SSD ultra-rápido, ray tracing e controle DualSense.",
    features: ["SSD Ultra-rápido", "Ray Tracing", "4K Gaming", "DualSense", "Retrocompatibilidade"],
    inStock: true,
    isNew: false,
    isBestseller: true
  }
];

/**
 * Categorias de produtos com ícones e informações
 */
const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: Grid, count: PRODUCTS.length },
  { id: 'smartphones', name: 'Smartphones', icon: Smartphone, count: PRODUCTS.filter(p => p.category === 'smartphones').length },
  { id: 'laptops', name: 'Laptops', icon: Laptop, count: PRODUCTS.filter(p => p.category === 'laptops').length },
  { id: 'headphones', name: 'Fones', icon: Headphones, count: PRODUCTS.filter(p => p.category === 'headphones').length },
  { id: 'cameras', name: 'Câmeras', icon: Camera, count: PRODUCTS.filter(p => p.category === 'cameras').length },
  { id: 'watches', name: 'Relógios', icon: Watch, count: PRODUCTS.filter(p => p.category === 'watches').length },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: PRODUCTS.filter(p => p.category === 'gaming').length }
];

/**
 * Componente principal da aplicação TechStore
 */
function App() {
  // Estados para controle da interface
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  
  // Estados para controle do catálogo
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-low', 'price-high', 'rating'
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Refs para controle de scroll
  const chatMessagesRef = useRef(null);
  const heroRef = useRef(null);

  /**
   * Efeito para controlar a exibição do botão "voltar ao topo"
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Efeito para gerar ID de conversa e mensagem de boas-vindas do chatbot
   */
  useEffect(() => {
    if (isChatOpen && !conversationId) {
      setConversationId(`conv-${Date.now()}`);
      setMessages([
        {
          role: 'assistant',
          content: 'Olá! Sou o assistente virtual da TechStore. Como posso ajudar você hoje? Posso tirar dúvidas sobre produtos, preços, especificações e muito mais! 😊',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isChatOpen, conversationId]);

  /**
   * Efeito para scroll automático das mensagens do chat
   */
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Função para enviar mensagem ao chatbot
   * @param {string} message - Mensagem do usuário
   * @param {string} productContext - Contexto do produto (opcional)
   */
  const sendMessage = async (message, productContext = null) => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // URL do backend do agente de IA
      const backendUrl = 'http://127.0.0.1:8000/perguntar';
      
      let messageToSend = message;
      if (productContext) {
        messageToSend = `Pergunta sobre ${productContext}: ${message}`;
      }

      const response = await axios.post(backendUrl, {
        pergunta: messageToSend
      });

      const assistantResponse = {
        role: 'assistant',
        content: response.data.resposta.conteudo,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.data.resposta.fontes_usadas,
      };
      
      setMessages(prev => [...prev, assistantResponse]);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Desculpe, não consegui processar sua solicitação no momento. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para lidar com perguntas específicas sobre produtos
   * @param {Object} product - Objeto do produto
   */
  const handleProductQuestion = (product) => {
    setIsChatOpen(true);
    const questionMessage = `Gostaria de saber mais sobre o ${product.name}.`;
    
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: questionMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    
    sendMessage(questionMessage, product.name);
  };

  /**
   * Função para filtrar produtos baseado na categoria e termo de busca
   */
  const getFilteredProducts = () => {
    let filtered = PRODUCTS;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Ordenar produtos
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  };

  /**
   * Função para alternar favoritos
   * @param {number} productId - ID do produto
   */
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  /**
   * Função para adicionar produto ao carrinho
   * @param {Object} product - Objeto do produto
   */
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /**
   * Função para scroll suave para o topo
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Função para formatar preço em reais
   * @param {number} price - Preço em centavos
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechStore
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by AI</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(true)}
                className="hidden md:flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Assistente IA</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tecnologia do Futuro
              <br />
              <span className="text-3xl md:text-5xl">com Assistente IA</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Descubra os melhores produtos de tecnologia com a ajuda do nosso assistente virtual inteligente. 
              Tire suas dúvidas, compare produtos e encontre exatamente o que precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Conversar com IA
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Produtos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Assistente IA 24/7",
                description: "Tire suas dúvidas a qualquer hora com nosso assistente virtual inteligente"
              },
              {
                icon: Truck,
                title: "Entrega Rápida",
                description: "Frete grátis para todo o Brasil e entrega expressa nas capitais"
              },
              {
                icon: Shield,
                title: "Garantia Estendida",
                description: "Proteção completa com garantia estendida e suporte técnico especializado"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Confira nossa seleção especial de produtos com as melhores ofertas e tecnologia mais avançada.
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <div className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                >
                  <option value="popularity">Mais Populares</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount > 0 && (
                        <Badge className="bg-red-500 text-white">
                          -{product.discount}%
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white">
                          Novo
                        </Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-yellow-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Best Seller
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFavorite(product.id)}
                        className="w-10 h-10 p-0"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''
                          }`} 
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-10 h-10 p-0"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          Fora de Estoque
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {product.description}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-slate-500">
                        ({product.reviews.toLocaleString()} avaliações)
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardFooter className="flex flex-col space-y-4">
                    {/* Price */}
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-lg text-slate-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {product.originalPrice > product.price && (
                          <p className="text-sm text-green-600 font-medium">
                            Economia de {formatPrice(product.originalPrice - product.price)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 w-full">
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Comprar' : 'Indisponível'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleProductQuestion(product)}
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Perguntar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Tente ajustar os filtros ou termo de busca
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tem dúvidas sobre nossos produtos?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Converse com nosso assistente virtual e encontre exatamente o que você precisa!
            </p>
            <Button
              size="lg"
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Conversar com Assistente IA
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">TechStore</h3>
                  <p className="text-xs text-slate-400">Powered by AI</p>
                </div>
              </div>
              <p className="text-slate-400">
                A melhor loja de tecnologia com assistente virtual inteligente.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Smartphones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fones de Ouvido</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Câmeras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} TechStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col h-[600px] border border-slate-200 dark:border-slate-700"
          >
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistente Virtual</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm opacity-80">Online agora</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chatbot Messages */}
            <div 
              ref={chatMessagesRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 text-xs opacity-70">
                        {msg.sources.filter(source => typeof source === 'string').join(', ')}
                      </div>
                    )}
                    <span 
                      className={`block text-right mt-1 text-xs ${
                        msg.role === 'user' ? 'text-white/70' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-bl-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-slate-500">Digitando...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex justify-center">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chatbot Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-2xl">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Digite sua pergunta..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputMessage);
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={isLoading || !inputMessage.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chatbot Button */}
      {!isChatOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={() => setIsChatOpen(true)}
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 left-6 z-40"
          >
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-0"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

