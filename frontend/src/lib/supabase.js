import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const supabaseAPI = {
  getCanteens: async () => {
    const { data, error } = await supabase.from('canteens').select('*')
    return { data: { canteens: data || [] }, error }
  },

  getMenuItems: async (canteenId, category) => {
    let query = supabase.from('menu_items').select('*')
    if (canteenId) query = query.eq('canteen_id', canteenId)
    if (category) query = query.eq('category', category)
    const { data, error } = await query
    return { data: { menu_items: data || [] }, error }
  },

  createOrder: async (orderData) => {
    const { data, error } = await supabase.from('orders').insert([{
      ...orderData,
      order_number: 'ORD-' + Date.now(),
      status: 'pending',
      payment_status: 'paid'
    }]).select()
    return { data: { order: data?.[0] }, error }
  },

  getOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, canteens(name)')
      .order('created_at', { ascending: false })
    return { data: { orders: data || [] }, error }
  }
}